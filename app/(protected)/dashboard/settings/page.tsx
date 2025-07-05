"use client"
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Shield, Trash2, Save, Plus, X, Clock, DollarSign } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import axios from 'axios';

const SettingsPage: React.FC = () => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [userProfile, setUserProfile] = useState({
        name: '',
        email: '',
        bio: '',
        walletAddress: '',
        role: 'user' as 'user' | 'expert'
    });
    
    const [expertProfile, setExpertProfile] = useState({
        tags: [] as string[],
        availableWeekDays: [] as string[],
        startTimeSlot: '',
        endTimeSlot: '',
        hourlyRate: 0
    });
    
    const [newTag, setNewTag] = useState('');
    
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    useEffect(() => {
        fetchUserData();
    }, []);
    
    const fetchUserData = async () => {
        try {
            const response = await axios.get('/api/profile');
            const userData = response.data;
            
            setUserProfile({
                name: userData.name || '',
                email: userData.email || '',
                bio: userData.bio || '',
                walletAddress: userData.walletAddress || '',
                role: userData.expertProfile ? 'expert' : 'user'
            });
            
            if (userData.expertProfile) {
                setExpertProfile({
                    tags: userData.expertProfile.tags || [],
                    availableWeekDays: userData.expertProfile.availableWeekDays || [],
                    startTimeSlot: userData.expertProfile.startTimeSlot ? 
                        new Date(userData.expertProfile.startTimeSlot).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) : '',
                    endTimeSlot: userData.expertProfile.endTimeSlot ? 
                        new Date(userData.expertProfile.endTimeSlot).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) : '',
                    hourlyRate: userData.expertProfile.hourlyRate || 0
                });
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            toast.error('Failed to load profile data');
        }
    };
    
    const handleSaveProfile = async () => {
        setLoading(true);
        try {
            const profileData: any = {
                name: userProfile.name,
                walletAddress: userProfile.walletAddress,
                bio: userProfile.bio
            };
            
            if (userProfile.role === 'expert') {
                // Convert time strings to Date objects
                const today = new Date();
                const [startHour, startMinute] = expertProfile.startTimeSlot.split(':');
                const [endHour, endMinute] = expertProfile.endTimeSlot.split(':');
                
                const startTime = new Date(today);
                startTime.setHours(parseInt(startHour), parseInt(startMinute), 0, 0);
                
                const endTime = new Date(today);
                endTime.setHours(parseInt(endHour), parseInt(endMinute), 0, 0);
                
                profileData.expertProfile = {
                    tags: expertProfile.tags,
                    availableWeekDays: expertProfile.availableWeekDays,
                    startTimeSlot: startTime.toISOString(),
                    endTimeSlot: endTime.toISOString(),
                    hourlyRate: parseFloat(expertProfile.hourlyRate.toString())
                };
                
                // Update user role to expert
                await axios.patch('/api/profile/role', { role: 'expert' });
            }
            
            await axios.post('/api/profile', { data: profileData });
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };
    
    const addTag = () => {
        if (newTag.trim() && !expertProfile.tags.includes(newTag.trim())) {
            setExpertProfile(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()]
            }));
            setNewTag('');
        }
    };
    
    const removeTag = (tagToRemove: string) => {
        setExpertProfile(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };
    
    const toggleWeekDay = (day: string) => {
        setExpertProfile(prev => ({
            ...prev,
            availableWeekDays: prev.availableWeekDays.includes(day)
                ? prev.availableWeekDays.filter(d => d !== day)
                : [...prev.availableWeekDays, day]
        }));
    };
    
    const handleDeleteAccount = () => {
        // Add your delete account logic here
        toast.error('Account deletion not implemented yet');
    };

    return (
        <DashboardLayout>
            <div className="p-6 max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Settings</h1>
                    <p className="text-gray-400">Manage your account and expert profile settings</p>
                </div>
                
                <Tabs defaultValue="profile" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-purple-500/20">
                        <TabsTrigger value="profile" className="data-[state=active]:bg-purple-900/30">
                            <User className="h-4 w-4 mr-2" />
                            Profile
                        </TabsTrigger>
                        <TabsTrigger value="expert" className="data-[state=active]:bg-purple-900/30">
                            <Shield className="h-4 w-4 mr-2" />
                            Expert Settings
                        </TabsTrigger>
                        <TabsTrigger value="account" className="data-[state=active]:bg-purple-900/30">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Account
                        </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="profile" className="space-y-6">
                        <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            value={userProfile.name}
                                            onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                                            className="bg-black/60 border-purple-500/20 focus:border-purple-400"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={userProfile.email}
                                            disabled
                                            className="bg-gray-800/60 border-gray-600/20 text-gray-400"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <Label htmlFor="walletAddress">Wallet Address</Label>
                                    <Input
                                        id="walletAddress"
                                        value={userProfile.walletAddress}
                                        onChange={(e) => setUserProfile(prev => ({ ...prev, walletAddress: e.target.value }))}
                                        placeholder="Your Solana wallet address"
                                        className="bg-black/60 border-purple-500/20 focus:border-purple-400"
                                    />
                                </div>
                                
                                <div>
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea
                                        id="bio"
                                        value={userProfile.bio}
                                        onChange={(e) => setUserProfile(prev => ({ ...prev, bio: e.target.value }))}
                                        placeholder="Tell us about yourself..."
                                        className="bg-black/60 border-purple-500/20 focus:border-purple-400"
                                        rows={4}
                                    />
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="expert-mode"
                                        checked={userProfile.role === 'expert'}
                                        onCheckedChange={(checked) => 
                                            setUserProfile(prev => ({ ...prev, role: checked ? 'expert' : 'user' }))
                                        }
                                    />
                                    <Label htmlFor="expert-mode">Enable Expert Mode</Label>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    
                    <TabsContent value="expert" className="space-y-6">
                        {userProfile.role === 'expert' ? (
                            <>
                                <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
                                    <CardHeader>
                                        <CardTitle>Expertise & Skills</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <Label>Skills & Tags</Label>
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {expertProfile.tags.map((tag, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="outline"
                                                        className="bg-purple-950/20 border-purple-500/30 text-purple-300"
                                                    >
                                                        {tag}
                                                        <button
                                                            onClick={() => removeTag(tag)}
                                                            className="ml-1 hover:text-red-400"
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </button>
                                                    </Badge>
                                                ))}
                                            </div>
                                            <div className="flex gap-2">
                                                <Input
                                                    value={newTag}
                                                    onChange={(e) => setNewTag(e.target.value)}
                                                    placeholder="Add a skill or expertise"
                                                    className="bg-black/60 border-purple-500/20 focus:border-purple-400"
                                                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                                                />
                                                <Button onClick={addTag} variant="outline" className="border-purple-500/30">
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                
                                <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
                                    <CardHeader>
                                        <CardTitle>Availability</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <Label>Available Days</Label>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                                                {weekDays.map(day => (
                                                    <Button
                                                        key={day}
                                                        variant={expertProfile.availableWeekDays.includes(day) ? "default" : "outline"}
                                                        className={`${expertProfile.availableWeekDays.includes(day) 
                                                            ? "bg-gradient-to-r from-purple-600 to-blue-600" 
                                                            : "border-purple-500/30 hover:bg-purple-900/20"
                                                        }`}
                                                        onClick={() => toggleWeekDay(day)}
                                                    >
                                                        {day.substring(0, 3)}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <Label htmlFor="startTime">
                                                    <Clock className="h-4 w-4 inline mr-1" />
                                                    Start Time
                                                </Label>
                                                <Input
                                                    id="startTime"
                                                    type="time"
                                                    value={expertProfile.startTimeSlot}
                                                    onChange={(e) => setExpertProfile(prev => ({ ...prev, startTimeSlot: e.target.value }))}
                                                    className="bg-black/60 border-purple-500/20 focus:border-purple-400"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="endTime">
                                                    <Clock className="h-4 w-4 inline mr-1" />
                                                    End Time
                                                </Label>
                                                <Input
                                                    id="endTime"
                                                    type="time"
                                                    value={expertProfile.endTimeSlot}
                                                    onChange={(e) => setExpertProfile(prev => ({ ...prev, endTimeSlot: e.target.value }))}
                                                    className="bg-black/60 border-purple-500/20 focus:border-purple-400"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="hourlyRate">
                                                    <DollarSign className="h-4 w-4 inline mr-1" />
                                                    Hourly Rate (SOL)
                                                </Label>
                                                <Input
                                                    id="hourlyRate"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    value={expertProfile.hourlyRate}
                                                    onChange={(e) => setExpertProfile(prev => ({ ...prev, hourlyRate: parseFloat(e.target.value) || 0 }))}
                                                    className="bg-black/60 border-purple-500/20 focus:border-purple-400"
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </>
                        ) : (
                            <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
                                <CardContent className="p-8 text-center">
                                    <Shield className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                                    <h3 className="text-lg font-medium mb-2">Expert Mode Disabled</h3>
                                    <p className="text-gray-400 mb-4">
                                        Enable expert mode in the Profile tab to access expert settings.
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                    
                    <TabsContent value="account" className="space-y-6">
                        <Card className="bg-black/40 backdrop-blur-sm border border-red-500/20">
                            <CardHeader>
                                <CardTitle className="text-red-400">Danger Zone</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Delete Account</h3>
                                        <p className="text-gray-400 mb-4">
                                            Once you delete your account, there is no going back. Please be certain.
                                        </p>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive">
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Delete Account
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className="bg-black/90 border border-red-500/20">
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle className="text-red-400">Are you absolutely sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete your
                                                        account and remove your data from our servers.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                                                        Delete Account
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
                
                <div className="flex justify-end mt-8">
                    <Button 
                        onClick={handleSaveProfile} 
                        disabled={loading}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                        <Save className="h-4 w-4 mr-2" />
                        {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default SettingsPage;