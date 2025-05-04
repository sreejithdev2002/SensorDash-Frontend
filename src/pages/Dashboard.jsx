import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import axiosInstance from "../axios/axiosInstance";
import CustomTooltip from "../components/CustomTooltip";

export default function Dashboard() {
  const [chartData, setChartData] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [saving, setSaving] = useState(false);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [selectedNode, setSelectedNode] = useState(null); // Track selected node
  const [newNodeName, setNewNodeName] = useState(""); // New name for node

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const startDataStream = async () => {
    await axiosInstance.post("/api/data/start");
    setIsStreaming(true);
    const id = setInterval(fetchHistoryData, 2000);
    setIntervalId(id);
  };

  const stopDataStream = async () => {
    await axiosInstance.post("/api/data/stop");
    clearInterval(intervalId);
    setIsStreaming(false);
  };

  const fetchHistoryData = async () => {
    try {
      const res = await axiosInstance.get("/api/data/history");
      if (Array.isArray(res.data)) {
        setChartData(res.data);
      } else {
        console.warn("Expected array but got:", res.data);
        setChartData([]);
      }
    } catch (err) {
      console.error("Failed to fetch data history:", err);
      setChartData([]);
    }
  };

  const loadFlowchart = async () => {
    try {
      const res = await axiosInstance.post("/api/flow/load");
      setNodes(res.data.nodes || []);
      setEdges(res.data.edges || []);
    } catch (err) {
      console.error("Failed to load flowchart:", err);
    }
  };

  const saveFlowchart = async () => {
    setSaving(true);
    try {
      const elements = {
        nodes,
        edges,
      };
      await axiosInstance.post("/api/flow/save", { elements });
      alert("Flowchart saved!");
    } catch (err) {
      console.error("Error saving flowchart:", err);
    } finally {
      setSaving(false);
    }
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleAddNode = () => {
    const id = `${+new Date()}`;
    const newNode = {
      id,
      type: "default",
      data: { label: `Node ${nodes.length + 1}` },
      position: {
        x: Math.random() * 250,
        y: Math.random() * 250,
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const handleNodeClick = (event, node) => {
    setSelectedNode(node);
    setNewNodeName(node.data.label || "");
    setShowModal(true); // Show modal on node click
  };

  const handleNameChange = (event) => {
    setNewNodeName(event.target.value);
  };

  const handleSaveName = () => {
    if (selectedNode && newNodeName) {
      const updatedNodes = nodes.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, label: newNodeName } }
          : node
      );
      setNodes(updatedNodes);
      setSelectedNode(null);
      setNewNodeName(""); // Clear the input after saving
    }
  };

  const handleLoadFlowcharts = async () => {
    try {
      const res = await axiosInstance.get("/api/flow/load");
      if (res.data?.nodes && Array.isArray(res.data.nodes)) {
        const transformedNodes = res.data.nodes.map((node) => ({
          ...node,
          type: "default", // optional, if not already set
        }));
        setNodes(transformedNodes);
      } else {
        setNodes([]);
      }

      if (res.data?.edges && Array.isArray(res.data.edges)) {
        setEdges(res.data.edges);
      } else {
        setEdges([]);
      }
    } catch (err) {
      console.error("Failed to load flowchart:", err);
    }
  };

  useEffect(() => {
    fetchHistoryData();
    loadFlowchart();
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300); // Give layout time to settle
  }, []);

  return (
    <div className="space-y-10 p-8">
      <h1 className="text-3xl font-semibold text-gray-800 mt-10 md:mt-0">
        Dashboard
      </h1>

      {/* ========== Chart Section ========== */}
      <div className="bg-white rounded-xl p-6 shadow-md space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg sm:text-2xl md:text-4xl font-semibold text-[#111d4a]">
            Sensor Data
          </h2>
          <div className="space-x-3">
            <button
              className={`text-xs md:text-base px-5 md:px-4 py-2 rounded bg-[#009d4e] text-white ${
                isStreaming ? "cursor-not-allowed opacity-70" : "cursor-pointer"
              }`}
              onClick={startDataStream}
              disabled={isStreaming}
            >
              Start
            </button>

            <button
              className={`text-xs md:text-base px-5 md:px-4 py-2 rounded bg-[#92140c] text-white ${
                !isStreaming
                  ? "cursor-not-allowed opacity-70"
                  : "cursor-pointer"
              }`}
              onClick={stopDataStream}
              disabled={!isStreaming}
            >
              Stop
            </button>
          </div>
        </div>
        {chartData.length > 0 ? (
          <>
            {/* Top Row: Line & Bar Charts side by side */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-0">
              {/* Line Chart */}
              <div className="flex md:flex-1 h-40 sm:h-44 md:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="timestamp"
                      tickFormatter={(value) =>
                        new Date(value).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })
                      }
                      tick={{ fontSize: 12, fill: "#333" }}
                      textAnchor="center"
                    />

                    <YAxis tick={{ fontSize: 12, fill: "#333" }} />
                    {/* <Tooltip /> */}
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart */}
              <div className="flex md:flex-1 h-40 sm:h-44 md:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                      dataKey="timestamp"
                      tickFormatter={(value) =>
                        new Date(value).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })
                      }
                      tick={{ fontSize: 12, fill: "#333" }}
                      textAnchor="center"
                    />

                    <YAxis tick={{ fontSize: 12, fill: "#333" }} />
                    {/* <Tooltip /> */}
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bottom Row: Area Chart full width */}
            <div className="h-40 sm:h-44 md:h-64 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#db1230" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#db1230" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(value) =>
                      new Date(value).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })
                    }
                    tick={{ fontSize: 12, fill: "#333" }}
                    textAnchor="center"
                  />

                  <YAxis tick={{ fontSize: 12, fill: "#333" }} />
                  <CartesianGrid strokeDasharray="3 3" />
                  {/* <Tooltip /> */}
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#db1230"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-400 mt-10">
            No data to display
          </div>
        )}

        {/* Your chart components here */}
      </div>

      {/* ========== Flowchart Section ========== */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-2xl md:text-4xl font-semibold text-[#111d4a]">
            Flow Chart
          </h2>
          <div className="space-x-1 md:space-x-3">
            <button
              className="text-[10px] sm:text-xs md:text-base px-2 md:px-4 py-2 bg-[#5f5490] text-white rounded"
              onClick={handleAddNode}
            >
              Add Node
            </button>
            <button
              className="text-[10px] sm:text-xs md:text-base px-2 md:px-4 py-2 bg-[#111d4a] text-white rounded"
              onClick={saveFlowchart}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Flowchart"}
            </button>
            <button
              className="text-[10px] sm:text-xs md:text-base px-2 md:px-4 py-2 bg-[#111d4a] text-white rounded"
              onClick={handleLoadFlowcharts}
            >
              Load Flowchart
            </button>
          </div>
        </div>
        <div className="h-[300px] md:h-[500px] border rounded">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            onNodeClick={handleNodeClick} // Add the onNodeClick handler
          >
            <Background />
            <Controls />
          </ReactFlow>

          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50">
              <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Rename Node</h2>
                <input
                  type="text"
                  value={newNodeName}
                  onChange={handleNameChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
                  placeholder="Enter new name"
                />
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-400 text-white rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handleSaveName();
                      setShowModal(false);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
