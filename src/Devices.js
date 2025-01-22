import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconLayoutDashboard, IconUser, IconSettings, IconLogout, IconDevices, IconPlus, IconChevronDown, IconCloud } from '@tabler/icons-react';
import { Sidebar, SidebarItem } from './components/ui/Sidebar';
import { DeviceDataService } from './services/DeviceDataService';
import './Dashboard.css';

const Devices = () => {
    const navigate = useNavigate();
    const [isManualInputOpen, setIsManualInputOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [formData, setFormData] = useState({
        temperature: '',
        moisture: '',
        phosphorous: '',
        potassium: '',
        nitrogen: '',
        ph: '',
        oxygen: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError('');

        try {
            const result = await DeviceDataService.storeDeviceData(formData);
            if (result.success) {
                // Clear form after successful submission
                setFormData({
                    temperature: '',
                    moisture: '',
                    phosphorous: '',
                    potassium: '',
                    nitrogen: '',
                    ph: '',
                    oxygen: ''
                });
                setIsManualInputOpen(false);
            } else {
                setSubmitError('Failed to store data. Please try again.');
            }
        } catch (error) {
            setSubmitError('An error occurred while storing data.');
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAddDevice = () => {
        // TODO: Add device connection logic
        console.log('Add new device clicked');
    };

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="dashboard-container">
            <Sidebar>
                <div className="menu-items">
                    <SidebarItem
                        icon={<IconLayoutDashboard size={24} />}
                        text="Dashboard"
                        to="/dashboard"
                    />
                    <SidebarItem
                        icon={<IconDevices size={24} />}
                        text="Devices"
                        to="/devices"
                        active
                    />
                    <SidebarItem
                        icon={<IconCloud size={24} />}
                        text="Weather"
                        to="/weather"
                    />
                    <SidebarItem
                        icon={<IconUser size={24} />}
                        text="Profile"
                        to="/profile"
                    />
                    <SidebarItem
                        icon={<IconSettings size={24} />}
                        text="Settings"
                        to="/settings"
                    />
                    <SidebarItem
                        icon={<IconLogout size={24} />}
                        text="Logout"
                        onClick={handleLogout}
                    />
                </div>
                <div className="profile-section">
                    <div className="profile-image" />
                    <span className="profile-name">John Doe</span>
                </div>
            </Sidebar>

            <main className="main-content">
                <div className="content-section">
                    <h2 className="text-2xl font-bold mb-6 text-gray-100">Devices</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div 
                            onClick={handleAddDevice}
                            className="flex flex-col items-center justify-center bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 border-dashed border-gray-600 hover:border-purple-500 min-h-[200px]"
                        >
                            <IconPlus size={48} className="text-purple-500 mb-4" />
                            <span className="text-lg font-medium text-gray-300">Add New Device</span>
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <button
                            onClick={() => setIsManualInputOpen(!isManualInputOpen)}
                            className="w-full px-6 py-4 flex items-center justify-between bg-gray-900 hover:bg-gray-700 transition-colors"
                        >
                            <span className="text-lg font-semibold text-gray-200">Manual Data Input</span>
                            <IconChevronDown 
                                size={24} 
                                className={`text-gray-400 transition-transform ${isManualInputOpen ? 'transform rotate-180' : ''}`}
                            />
                        </button>

                        {isManualInputOpen && (
                            <div className="p-6">
                                {submitError && (
                                    <div className="mb-4 p-3 bg-red-500 text-white rounded-md">
                                        {submitError}
                                    </div>
                                )}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300">Temperature (°C)</label>
                                            <input
                                                type="number"
                                                name="temperature"
                                                value={formData.temperature}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                                placeholder="Enter temperature"
                                                step="0.1"
                                                required
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300">Moisture (%)</label>
                                            <input
                                                type="number"
                                                name="moisture"
                                                value={formData.moisture}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                                placeholder="Enter moisture"
                                                step="0.1"
                                                required
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300">Phosphorous (%)</label>
                                            <input
                                                type="number"
                                                name="phosphorous"
                                                value={formData.phosphorous}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                                placeholder="Enter phosphorous"
                                                step="0.1"
                                                required
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300">Potassium (%)</label>
                                            <input
                                                type="number"
                                                name="potassium"
                                                value={formData.potassium}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                                placeholder="Enter potassium"
                                                step="0.1"
                                                required
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300">Nitrogen (%)</label>
                                            <input
                                                type="number"
                                                name="nitrogen"
                                                value={formData.nitrogen}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                                placeholder="Enter nitrogen"
                                                step="0.1"
                                                required
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300">pH Level</label>
                                            <input
                                                type="number"
                                                name="ph"
                                                value={formData.ph}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                                placeholder="Enter pH"
                                                step="0.1"
                                                required
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300">Oxygen (%)</label>
                                            <input
                                                type="number"
                                                name="oxygen"
                                                value={formData.oxygen}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                                placeholder="Enter oxygen"
                                                step="0.1"
                                                required
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className={`bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Submitting...' : 'Submit Data'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Devices; 