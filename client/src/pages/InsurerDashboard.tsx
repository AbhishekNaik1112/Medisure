import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, Clock, AlertCircle, X, LogOut, Loader2, RotateCw } from 'lucide-react';

const InsurerDashboard = () => {
  const navigate = useNavigate();
  const [claims, setClaims] = useState<
    {
      _id: string;
      createdAt: string;
      patientName: string;
      amount: number;
      status: string;
      documentLink: string;
    }[]
  >([]);
  const [selectedClaim, setSelectedClaim] = useState<{
    _id: string;
    createdAt: string;
    patientName: string;
    amount: number;
    status: string;
    documentLink: string;
  } | null>(null);
  const [filter, setFilter] = useState('all');
  const [approvedAmount, setApprovedAmount] = useState('');
  const [insurerComments, setInsurerComments] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://claims-management-system-server.vercel.app/claims', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setClaims(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleStatusUpdate = async (status: string) => {
    if (!selectedClaim) return;
    setIsLoading(true);
    try {
      await axios.patch(
        `https://claims-management-system-server.vercel.app/claims/${selectedClaim._id}`,
        { status, approvedAmount, insurerComments },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
      );
      fetchClaims();
      setSelectedClaim(null);
    } catch (error) {
      console.error('Error updating claim:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredClaims = claims.filter(
    (claim) => filter === 'all' || claim.status.toLowerCase() === filter,
  );

  const statusBadge = (status: string) => {
    const baseStyle = 'inline-flex px-3 py-1 rounded-full text-sm font-semibold';
    switch (status) {
      case 'approved':
        return (
          <span className={`${baseStyle} bg-green-500 text-white`}>
            <CheckCircle size={14} className="inline-block mr-1" /> Approved
          </span>
        );
      case 'pending':
        return (
          <span className={`${baseStyle} bg-orange-500 text-white`}>
            <Clock size={14} className="inline-block mr-1" /> Pending
          </span>
        );
      case 'rejected':
        return (
          <span className={`${baseStyle} bg-red-500 text-white`}>
            <AlertCircle size={14} className="inline-block mr-1" /> Rejected
          </span>
        );
      default:
        return <span className={`${baseStyle} bg-gray-300`}>Unknown</span>;
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <div className="flex justify-between items-center p-6 shadow-lg border-b border-gray-300 rounded-lg">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Insurer Dashboard</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchClaims}
            disabled={isLoading}
            className="px-6 py-2 bg-black text-white rounded-lg flex items-center gap-2 hover:opacity-80 transition shadow-md"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <RotateCw />} Refresh
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-black text-white rounded-lg flex items-center gap-2 hover:opacity-80 transition shadow-md"
          >
            <LogOut /> Logout
          </button>
        </div>
      </div>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="px-4 py-2 bg-white shadow-sm rounded-lg mt-6 mb-4"
      >
        <option value="all">All Claims</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>

      <div className="overflow-x-auto">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <table className="w-full text-black text-center">
            <thead>
              <tr className="bg-black text-white">
                <th className="p-4 text-center">Date</th>
                <th className="p-4 text-center">Name</th>
                <th className="p-4 text-center">Requested Amount</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Attached Document</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredClaims.map((claim) => (
                <tr key={claim._id} className="hover:bg-gray-200 transition">
                  <td className="p-4 text-center">
                    {new Date(claim.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-center">{claim.patientName}</td>
                  <td className="p-4 text-center">₹{claim.amount.toLocaleString()}</td>
                  <td className="p-4 text-center">{statusBadge(claim.status)}</td>
                  <td className="p-4 text-center">
                    <a
                      className="text-blue-500"
                      href={claim.documentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Click Me.
                    </a>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => setSelectedClaim(claim)}
                      className="px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2 hover:opacity-80 transition shadow-md"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedClaim && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-96 text-black shadow-xl">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Review Claim</h3>
              <button
                onClick={() => setSelectedClaim(null)}
                className="text-gray-500 hover:text-black"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mt-4">
              <p>
                <strong>Patient:</strong> {selectedClaim.patientName}
              </p>
              <p>
                <strong>Requested Amount:</strong> ₹{selectedClaim.amount.toLocaleString()}
              </p>

              <p>
                <strong>Status:</strong> {statusBadge(selectedClaim.status)}{' '}
              </p>
              <p>
                <strong>Attached Documents:</strong>{' '}
                <a
                  className="text-blue-500"
                  href={selectedClaim.documentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Click me
                </a>
              </p>
              <div className="mt-4">
                <label className="block mb-2" htmlFor="approvedAmount">
                  Approved Amount
                </label>
                <input
                  type="number"
                  id="approvedAmount"
                  value={approvedAmount}
                  onChange={(e) => setApprovedAmount(e.target.value)}
                  className="w-full p-2 rounded mb-4 border shadow-sm"
                  placeholder="Enter approved amount"
                />
                <label className="block mb-2" htmlFor="insurerComments">
                  Insurer Comments
                </label>
                <textarea
                  id="insurerComments"
                  value={insurerComments}
                  onChange={(e) => setInsurerComments(e.target.value)}
                  className="w-full p-2 rounded mb-4 border shadow-sm"
                  placeholder="Enter your comments"
                />
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleStatusUpdate('approved')}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusUpdate('rejected')}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md"
                >
                  Reject
                </button>
                <button
                  onClick={() => setSelectedClaim(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 shadow-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsurerDashboard;
