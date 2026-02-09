import { useState } from "react";
import { User, Lock, Bell, Palette, Save } from "lucide-react";
import { Button } from "../../shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../shared/ui/card";
import { Switch } from "../../shared/ui/switch";
import { Input } from "../../shared/ui/input";
import { Label } from "../../shared/ui/label";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<
        "profile" | "security" | "notifications" | "appearance"
    >("profile");

    return (
        <div className="p-6 space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Settings</h1>
                <Button className="flex items-center gap-2">
                    <Save size={16} /> Save Changes
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <Card className="lg:col-span-1">
                    <CardContent className="p-2">
                        <nav className="space-y-1">
                            <SidebarItem
                                icon={<User size={18} />}
                                label="Profile"
                                active={activeTab === "profile"}
                                onClick={() => setActiveTab("profile")}
                            />
                            <SidebarItem
                                icon={<Lock size={18} />}
                                label="Security"
                                active={activeTab === "security"}
                                onClick={() => setActiveTab("security")}
                            />
                            <SidebarItem
                                icon={<Bell size={18} />}
                                label="Notifications"
                                active={activeTab === "notifications"}
                                onClick={() => setActiveTab("notifications")}
                            />
                            <SidebarItem
                                icon={<Palette size={18} />}
                                label="Appearance"
                                active={activeTab === "appearance"}
                                onClick={() => setActiveTab("appearance")}
                            />
                        </nav>
                    </CardContent>
                </Card>

                {/* Content */}
                <div className="lg:col-span-3">
                    {activeTab === "profile" && <ProfileSettings />}
                    {activeTab === "security" && <SecuritySettings />}
                    {activeTab === "notifications" && <NotificationSettings />}
                    {activeTab === "appearance" && <AppearanceSettings />}
                </div>
            </div>
        </div>
    );
}

function SidebarItem({
    icon,
    label,
    active,
    onClick,
}: {
    icon: React.ReactNode;
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${active
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
                }`}
        >
            {icon}
            {label}
        </button>
    );
}

/* ===================== Tabs ===================== */

function ProfileSettings() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>First Name</Label>
                        <Input placeholder="John" />
                    </div>
                    <div className="space-y-2">
                        <Label>Last Name</Label>
                        <Input placeholder="Doe" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="admin@example.com" />
                </div>
            </CardContent>
        </Card>
    );
}

function SecuritySettings() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label>Change Password</Label>
                    <Input type="password" placeholder="New password" />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">
                            Add an extra layer of security
                        </p>
                    </div>
                    <Switch />
                </div>
            </CardContent>
        </Card>
    );
}

function NotificationSettings() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <ToggleRow
                    title="Email Notifications"
                    description="Receive updates via email"
                />
                <ToggleRow
                    title="System Alerts"
                    description="Important system notifications"
                />
                <ToggleRow
                    title="Weekly Reports"
                    description="Summary of weekly activity"
                />
            </CardContent>
        </Card>
    );
}

function AppearanceSettings() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">Dark Mode</p>
                        <p className="text-sm text-muted-foreground">
                            Toggle dark / light theme
                        </p>
                    </div>
                    <Switch />
                </div>
            </CardContent>
        </Card>
    );
}

function ToggleRow({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <Switch />
        </div>
    );
}
