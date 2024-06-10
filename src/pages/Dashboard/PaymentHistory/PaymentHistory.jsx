import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [month, setMonth] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [filteredPayments, setFilteredPayments] = useState([]);

    const { data: payments = [], refetch } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            setFilteredPayments(res.data);
            return res.data;
        }
    });

    const handleSearch = () => {
        const filtered = payments.filter(payment => {
            const paymentMonth = new Date(payment.date).getMonth() + 1; // getMonth() is zero-based
            return paymentMonth === parseInt(month);
        });

        const sorted = filtered.sort((a, b) => {
            if (sortOrder === 'asc') {
                return new Date(a.date) - new Date(b.date);
            } else {
                return new Date(b.date) - new Date(a.date);
            }
        });

        setFilteredPayments(sorted);
    };

    return (
        <div>
            <h2 className="text-3xl">Total Payments: {filteredPayments.length}</h2>
            <div className="my-4 flex flex-col lg:flex-row lg:items-center">
                <input
                    type="number"
                    placeholder="Enter month number"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="input input-bordered mb-2 lg:mb-0 lg:mr-2 w-full lg:w-auto"
                />
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="select select-bordered mb-2 lg:mb-0 lg:mr-2 w-full lg:w-auto"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
                <button onClick={handleSearch} className="btn btn-primary w-full lg:w-auto">
                    Search
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Rent</th>
                            <th>Transaction Id</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPayments.map((payment, index) => (
                            <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <td>{payment.rent}</td>
                                <td>{payment.transactionId}</td>
                                <td>{payment.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
