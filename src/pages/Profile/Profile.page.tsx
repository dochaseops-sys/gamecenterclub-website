
import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/redux/store';
import { useDeleteAccountMutation, useUpdateProfileMutation } from '../../services/redux/apis/auth';
import { logout, updateUser } from '../../services/redux/slices/auth.slice';
import { clearStorage } from '../../utils/localstorage.utils';
import AppWrapper from '../../HOC/AppWrapper';
import { User, Trash2, Save, Loader2, AlertTriangle, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const user = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [name, setName] = useState(user.name || '');
    const [email, setEmail] = useState(user.email || '');
    const [profilePicPreview, setProfilePicPreview] = useState<string>(user.profile_pic || '');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
    const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();

    useEffect(() => {
        setName(user.name || '');
        setEmail(user.email || '');
        setProfilePicPreview(user.profile_pic || '');
    }, [user]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const objectUrl = URL.createObjectURL(file);
            setProfilePicPreview(objectUrl);
        }
    };

const handleUpdate = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);

    if (selectedFile) {
      formData.append("profile_pic", selectedFile); 
    }

    const updatedUser = await updateProfile(formData).unwrap();

    dispatch(updateUser(updatedUser));
    setIsEditing(false);
    setSelectedFile(null);
  } catch (error) {
    console.error("Failed to update profile", error);
  }
};


    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            try {
                await deleteAccount().unwrap();
                dispatch(logout());
                clearStorage();
                navigate('/login');
            } catch (error) {
                console.error("Failed to delete account", error);
            }
        }
    };

    return (
        <AppWrapper>
            <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
                <div className="flex items-center space-x-4 mb-6 md:mb-8">
                    <div className="p-3 bg-primary/10 rounded-full">
                        <User className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
                        <p className="text-muted-foreground">Manage your account settings and preferences</p>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="bg-primary/10 hover:bg-primary/20 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            {isEditing ? 'Cancel' : 'Edit'}
                        </button>
                    </div>

                    <div className="flex items-center space-x-6 mb-6">
                        <div className="relative">
                            {profilePicPreview ? (
                                <img
                                    src={profilePicPreview}
                                    alt="Profile"
                                    className="w-20 h-20 rounded-full object-cover border-2 border-border"
                                />
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center border-2 border-border">
                                    <User className="w-10 h-10 text-muted-foreground" />
                                </div>
                            )}
                            {isEditing && (
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors shadow-sm"
                                    title="Change Profile Picture"
                                >
                                    <Camera className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {isEditing && (
                            <div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="text-sm text-primary hover:underline font-medium"
                                >
                                    Change Picture
                                </button>
                                <p className="text-xs text-muted-foreground mt-1">
                                    JPG, GIF or PNG.
                                </p>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div className="grid gap-2">
                            <label htmlFor="name" className="text-sm font-medium text-muted-foreground">Full Name</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={!isEditing}
                                required
                                className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${isEditing ? "text-black bg-white" : "text-white bg-transparent"}`}
                            />  
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={!isEditing}
                                required
                                className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${isEditing ? "text-black bg-white" : "text-white bg-transparent"}`}   
                            />
                        </div>

                        {isEditing && (
                            <div className="pt-4 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                                >
                                    {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                    Save Changes
                                </button>
                            </div>
                        )}
                    </form>
                </div>

                <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                            <h3 className="text-lg font-semibold text-destructive flex items-center">
                                <AlertTriangle className="w-5 h-5 mr-2" />
                                Danger Zone
                            </h3>
                            <p className="text-sm text-destructive/80">
                                Permanently delete your account and all of your content.
                            </p>
                        </div>
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="w-full md:w-auto inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2"
                        >
                            {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </AppWrapper>
    );
};

export default Profile;
