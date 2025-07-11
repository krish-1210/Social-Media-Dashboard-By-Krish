import React, { useState, useCallback, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { ChevronRight, Bell, Search, Home, BarChart2, Calendar, Settings, LogOut, Twitter, Instagram, Facebook, Linkedin, PlusCircle, Image as ImageIcon, Video, FileText, Send } from 'lucide-react';

// --- MOCK DATA --- //
const engagementData = [
  { name: 'Jan', Twitter: 4000, Instagram: 2400, Facebook: 2200 },
  { name: 'Feb', Twitter: 3000, Instagram: 1398, Facebook: 2210 },
  { name: 'Mar', Twitter: 2000, Instagram: 9800, Facebook: 2290 },
  { name: 'Apr', Twitter: 2780, Instagram: 3908, Facebook: 2000 },
  { name: 'May', Twitter: 1890, Instagram: 4800, Facebook: 2181 },
  { name: 'Jun', Twitter: 2390, Instagram: 3800, Facebook: 2500 },
  { name: 'Jul', Twitter: 3490, Instagram: 4300, Facebook: 2100 },
];

const followerData = [
  { name: 'Week 1', followers: 120 },
  { name: 'Week 2', followers: 210 },
  { name: 'Week 3', followers: 350 },
  { name: 'Week 4', followers: 280 },
  { name: 'Week 5', followers: 450 },
  { name: 'Week 6', followers: 590 },
];

const trafficSourceData = [
  { name: 'Twitter', value: 400, color: '#1DA1F2' },
  { name: 'Instagram', value: 300, color: '#E4405F' },
  { name: 'Facebook', value: 300, color: '#1877F2' },
  { name: 'LinkedIn', value: 200, color: '#0A66C2' },
];

const initialScheduledPosts = [
    { id: 1, platform: 'Twitter', content: 'Excited to launch our new feature next week! #productlaunch #tech', scheduledTime: '2025-07-15T10:00:00', status: 'Scheduled' },
    { id: 2, platform: 'Instagram', content: 'Behind the scenes at our company retreat! ☀️ #companyculture #teambonding', scheduledTime: '2025-07-16T15:30:00', status: 'Scheduled' },
    { id: 3, platform: 'Facebook', content: 'Check out our latest blog post on the future of AI in marketing. Link in bio!', scheduledTime: '2025-07-17T12:00:00', status: 'Posted' },
];

// --- HELPER COMPONENTS --- //

const StatCard = ({ title, value, change, icon, color }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        <p className={`text-sm mt-1 ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{change}</p>
      </div>
      <div className={`p-3 rounded-full`} style={{ backgroundColor: `${color}20`}}>
        {React.cloneElement(icon, { style: { color } })}
      </div>
    </div>
  </div>
);

const PlatformIcon = ({ platform }) => {
    switch (platform.toLowerCase()) {
        case 'twitter': return <Twitter className="w-5 h-5 text-[#1DA1F2]" />;
        case 'instagram': return <Instagram className="w-5 h-5 text-[#E4405F]" />;
        case 'facebook': return <Facebook className="w-5 h-5 text-[#1877F2]" />;
        case 'linkedin': return <Linkedin className="w-5 h-5 text-[#0A66C2]" />;
        default: return null;
    }
};


// --- MAIN COMPONENTS --- //

const Dashboard = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Social Media Dashboard</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Followers" value="125,6K" change="+12.5% this month" icon={<Home />} color="#3B82F6" />
      <StatCard title="Total Engagement" value="84,2K" change="+8.2% this month" icon={<BarChart2 />} color="#10B981" />
      <StatCard title="Impressions" value="2.1M" change="-1.7% this month" icon={<Calendar />} color="#F97316" />
      <StatCard title="Scheduled Posts" value="24" change="3 upcoming" icon={<Send />} color="#8B5CF6" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Engagement Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={engagementData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(229, 231, 235, 0.5)" />
            <XAxis dataKey="name" tick={{ fill: '#6B7280' }} />
            <YAxis tick={{ fill: '#6B7280' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(5px)',
                border: '1px solid #e5e7eb',
                borderRadius: '0.75rem',
              }}
            />
            <Legend />
            <Bar dataKey="Twitter" fill="#1DA1F2" name="Twitter" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Instagram" fill="#E4405F" name="Instagram" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Facebook" fill="#1877F2" name="Facebook" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Follower Growth</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={followerData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(229, 231, 235, 0.5)" />
            <XAxis dataKey="name" tick={{ fill: '#6B7280' }} />
            <YAxis tick={{ fill: '#6B7280' }} />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)', border: '1px solid #e5e7eb', borderRadius: '0.75rem' }} />
            <Line type="monotone" dataKey="followers" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Traffic Sources</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={trafficSourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {trafficSourceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)', border: '1px solid #e5e7eb', borderRadius: '0.75rem' }} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Posts</h2>
        <div className="space-y-4">
            {initialScheduledPosts.slice(0,3).map(post => (
                <div key={post.id} className="flex items-start space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <PlatformIcon platform={post.platform} />
                    <div className="flex-1">
                        <p className="text-sm text-gray-700 dark:text-gray-300">{post.content}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            {post.status === 'Posted' ? `Posted on ${new Date(post.scheduledTime).toLocaleDateString()}` : `Scheduled for ${new Date(post.scheduledTime).toLocaleString()}`}
                        </p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${post.status === 'Posted' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'}`}>
                        {post.status}
                    </span>
                </div>
            ))}
        </div>
      </div>
    </div>
  </div>
);

const Scheduler = () => {
    const [posts, setPosts] = useState(initialScheduledPosts);
    const [newPostContent, setNewPostContent] = useState('');
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [scheduledTime, setScheduledTime] = useState('');

    const handlePlatformToggle = (platform) => {
        setSelectedPlatforms(prev => 
            prev.includes(platform) 
                ? prev.filter(p => p !== platform) 
                : [...prev, platform]
        );
    };

    const handleSchedulePost = (e) => {
        e.preventDefault();
        if (!newPostContent || selectedPlatforms.length === 0 || !scheduledTime) {
            alert("Please fill all fields to schedule a post.");
            return;
        }

        const newPosts = selectedPlatforms.map(platform => ({
            id: Date.now() + Math.random(),
            platform,
            content: newPostContent,
            scheduledTime,
            status: 'Scheduled',
        }));

        setPosts(prev => [...newPosts, ...prev].sort((a,b) => new Date(b.scheduledTime) - new Date(a.scheduledTime)));
        setNewPostContent('');
        setSelectedPlatforms([]);
        setScheduledTime('');
    };

    const platforms = ['Twitter', 'Instagram', 'Facebook', 'LinkedIn'];

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Content Scheduler</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg h-fit">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Create New Post</h2>
                    <form onSubmit={handleSchedulePost} className="space-y-4">
                        <div>
                            <textarea
                                value={newPostContent}
                                onChange={(e) => setNewPostContent(e.target.value)}
                                placeholder="What's on your mind?"
                                className="w-full h-32 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:text-white"
                            />
                        </div>
                        <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                            <ImageIcon className="w-6 h-6 hover:text-blue-500 cursor-pointer"/>
                            <Video className="w-6 h-6 hover:text-blue-500 cursor-pointer"/>
                            <FileText className="w-6 h-6 hover:text-blue-500 cursor-pointer"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Platforms</label>
                            <div className="flex flex-wrap gap-2">
                                {platforms.map(platform => (
                                    <button
                                        key={platform}
                                        type="button"
                                        onClick={() => handlePlatformToggle(platform)}
                                        className={`px-3 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors ${
                                            selectedPlatforms.includes(platform)
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                                        }`}
                                    >
                                        <PlatformIcon platform={platform} />
                                        {platform}
                                    </button>
                                ))}
                            </div>
                        </div>
                         <div>
                            <label htmlFor="schedule-time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Schedule Time</label>
                            <input
                                type="datetime-local"
                                id="schedule-time"
                                value={scheduledTime}
                                onChange={e => setScheduledTime(e.target.value)}
                                className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:text-white"
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                            <Send className="w-5 h-5" /> Schedule Post
                        </button>
                    </form>
                </div>
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Scheduled & Past Posts</h2>
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                        {posts.map(post => (
                             <div key={post.id} className="flex items-start space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg transition-all hover:shadow-md hover:border-blue-500 dark:hover:border-blue-500">
                                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                                    <PlatformIcon platform={post.platform} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-800 dark:text-gray-200">{post.content}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                        {new Date(post.scheduledTime).toLocaleString()}
                                    </p>
                                </div>
                                <span className={`text-xs font-medium px-2 py-1 rounded-full self-center ${post.status === 'Posted' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'}`}>
                                    {post.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Profile = ({ onLogout }) => (
    <div className="space-y-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile & Settings</h1>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
                <img 
                    src="https://placehold.co/128x128/3B82F6/FFFFFF?text=AV" 
                    alt="User Avatar"
                    className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
                />
                <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Alex Morgan</h2>
                    <p className="text-gray-600 dark:text-gray-400">alex.morgan@example.com</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Social Media Manager</p>
                    <button className="mt-4 px-4 py-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm font-semibold rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800">
                        Edit Profile
                    </button>
                </div>
            </div>
            
            <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Connected Accounts</h3>
                <div className="space-y-4">
                    {['Twitter', 'Instagram', 'Facebook', 'LinkedIn'].map(platform => (
                        <div key={platform} className="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div className="flex items-center gap-4">
                                <PlatformIcon platform={platform} />
                                <span className="font-medium text-gray-800 dark:text-gray-200">{platform}</span>
                            </div>
                            <button className="text-sm text-red-500 hover:text-red-700 font-semibold">Disconnect</button>
                        </div>
                    ))}
                     <button className="w-full mt-4 py-2 px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-400 transition flex items-center justify-center gap-2">
                        <PlusCircle className="w-5 h-5" /> Connect New Account
                    </button>
                </div>
            </div>

            <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-8">
                <button 
                    onClick={onLogout}
                    className="w-full sm:w-auto bg-red-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </div>
    </div>
);

const LoginScreen = ({ onLogin }) => (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
            <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-500">SocialDash</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Sign in to your dashboard</p>
                </div>
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <input type="email" id="email" defaultValue="alex.morgan@example.com" className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="password"className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <input type="password" id="password" defaultValue="password" className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="flex items-center justify-between">
                        <a href="#" className="text-sm text-blue-600 hover:underline dark:text-blue-400">Forgot password?</a>
                    </div>
                    <button type="submit" className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Sign In
                    </button>
                </form>
                 <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Don't have an account? <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-400">Sign up</a>
                </p>
            </div>
        </div>
    </div>
);


const Sidebar = ({ activePage, onNavigate, onLogout, isCollapsed, setCollapsed }) => {
    const navItems = useMemo(() => [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'scheduler', label: 'Scheduler', icon: Calendar },
        { id: 'analytics', label: 'Analytics', icon: BarChart2 },
        { id: 'settings', label: 'Settings', icon: Settings },
    ], []);

    return (
        <div className={`bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-300 ease-in-out flex flex-col ${isCollapsed ? 'w-20' : 'w-64'}`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 h-20">
                <span className={`font-bold text-xl text-blue-600 dark:text-blue-500 transition-opacity duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>SocialDash</span>
                <button onClick={() => setCollapsed(!isCollapsed)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <ChevronRight className={`transition-transform duration-300 ${isCollapsed ? '' : 'rotate-180'}`} />
                </button>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-2">
                {navItems.map(item => (
                    <a
                        key={item.id}
                        href="#"
                        onClick={(e) => { e.preventDefault(); onNavigate(item.id); }}
                        className={`flex items-center p-3 rounded-lg transition-colors ${
                            activePage === item.id 
                                ? 'bg-blue-500 text-white shadow-md' 
                                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                        } ${isCollapsed ? 'justify-center' : ''}`}
                    >
                        <item.icon className="h-6 w-6" />
                        <span className={`ml-4 transition-opacity duration-200 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>{item.label}</span>
                    </a>
                ))}
            </nav>
            <div className="px-2 py-4 border-t border-gray-200 dark:border-gray-700">
                <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); onLogout(); }}
                    className={`flex items-center p-3 rounded-lg transition-colors hover:bg-red-100 dark:hover:bg-red-900 text-red-500 dark:text-red-400 ${isCollapsed ? 'justify-center' : ''}`}
                >
                    <LogOut className="h-6 w-6" />
                    <span className={`ml-4 transition-opacity duration-200 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>Logout</span>
                </a>
            </div>
        </div>
    );
};

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activePage, setActivePage] = useState('dashboard');
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

    const handleLogin = useCallback(() => setIsAuthenticated(true), []);
    const handleLogout = useCallback(() => setIsAuthenticated(false), []);
    const handleNavigate = useCallback((page) => setActivePage(page), []);

    if (!isAuthenticated) {
        return <LoginScreen onLogin={handleLogin} />;
    }

    const renderContent = () => {
        switch (activePage) {
            case 'dashboard':
                return <Dashboard />;
            case 'scheduler':
                return <Scheduler />;
            case 'settings':
            case 'analytics':
                return <Profile onLogout={handleLogout} />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 font-sans">
            <Sidebar 
                activePage={activePage} 
                onNavigate={handleNavigate} 
                onLogout={handleLogout}
                isCollapsed={isSidebarCollapsed}
                setCollapsed={setSidebarCollapsed}
            />
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="flex items-center justify-between h-20 px-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            className="w-full max-w-xs pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-center space-x-6">
                        <button className="relative text-gray-600 dark:text-gray-300 hover:text-blue-500">
                            <Bell />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
                        </button>
                        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavigate('settings')}>
                            <img src="https://placehold.co/40x40/3B82F6/FFFFFF?text=AV" alt="User Avatar" className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-semibold text-sm text-gray-900 dark:text-white">Alex Morgan</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="flex-1 p-8 overflow-y-auto">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}
