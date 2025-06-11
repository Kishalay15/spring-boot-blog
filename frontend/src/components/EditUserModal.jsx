import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../utils/api';

const EditUserModal = ({ userId, isOpen, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        about: '',
    });

    useEffect(() => {
        if (isOpen && userId) {
            const fetchUser = async () => {
                const token = localStorage.getItem('token');
                try {
                    const res = await axios.get(`${API_BASE_URL}/users/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setFormData({ ...res.data, password: '' });
                } catch (err) {
                    toast.error("Failed to fetch user data");
                }
            };
            fetchUser();
        }
    }, [isOpen, userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!formData.password.trim()) {
            toast.error("Please enter your password to confirm changes");
            return;
        }

        try {
            // 1. Verify password
            await axios.post(
                `${API_BASE_URL}/auth/verify-password`,
                {
                    username: formData.email, // using updated email (in case it's changed)
                    password: formData.password,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // 2. If verified, update profile
            const updatedData = { ...formData };
            const res = await axios.put(
                `${API_BASE_URL}/users/${userId}`,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Profile updated successfully");
            onUpdate(res.data);
            onClose();
        } catch (err) {
            if (err.response?.status === 401) {
                toast.error("Incorrect password");
            } else {
                toast.error("Update failed");
            }
            console.error("Update error:", err.response?.data || err.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter current password to save changes"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    <textarea
                        name="about"
                        placeholder="About"
                        value={formData.about}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserModal;
