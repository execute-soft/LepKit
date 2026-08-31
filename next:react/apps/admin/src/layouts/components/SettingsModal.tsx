import { useState } from "react";
import { ArrowRight, Camera, Check, Mail } from "lucide-react";
import { Input, OptimizedImage } from "@repo/uix/react/primitives";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: Readonly<SettingsModalProps>) {
  const [activeTab, setActiveTab] = useState("General");
  const [webhooksEnabled, setWebhooksEnabled] = useState(true);
  const [emailAlertsEnabled, setEmailAlertsEnabled] = useState(true);
  const tabs = ["General", "API Keys", "Webhooks", "Billing"];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Side Modal */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-140 bg-white dark:bg-card z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between p-6 pb-5">
            <div>
              <h2 className="text-[26px] font-bold text-gray-900 dark:text-gray-100">Settings</h2>
              <p className="text-[14px] text-gray-500 dark:text-gray-400 mt-1">Manage your platform configuration and preferences.</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-muted rounded-full transition-colors cursor-pointer"
            >
              <ArrowRight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Tabs */}
          <div className="px-6 pb-2">
            <div className="flex items-center gap-2 border-b border-gray-100 dark:border-border">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-4 py-3 text-[14px] font-medium transition-all cursor-pointer ${activeTab === tab
                    ? "text-gray-900 dark:text-gray-100"
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-gray-100 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto scrollbar-thin p-6">
            {/* Profile Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600" />
                <span className="text-[13px] font-medium text-gray-500 dark:text-gray-400">Account</span>
              </div>
              <p className="text-[12px] text-gray-400 mb-4">Platform administrator details</p>

              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <OptimizedImage
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
                    alt="User avatar"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white dark:bg-muted border border-gray-200 dark:border-border rounded-full flex items-center justify-center shadow-base hover:bg-gray-50 dark:hover:bg-secondary transition-colors cursor-pointer">
                    <Camera className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Input
                    label="First Name"
                    type="text"
                    defaultValue="Admin"
                  />
                </div>
                <div>
                  <Input
                    label="Last Name"
                    type="text"
                    defaultValue="User"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <div className="relative">
                  <Input
                    label="E-mail address"
                    type="email"
                    defaultValue="admin@execute.dev"
                    className="pr-32"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/30 rounded-full">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">Verified</span>
                  </div>
                </div>
              </div>

              {/* Organization Field */}
              <div className="mb-1">
                <Input
                  label="Organization"
                  type="text"
                  defaultValue="Execute Inc."
                />
              </div>
            </div>

            {/* Notifications Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600" />
                <span className="text-[13px] font-medium text-gray-500 dark:text-gray-400">Notifications</span>
              </div>
              <p className="text-[12px] text-gray-400 mb-5">
                Configure how you receive platform alerts and updates.
              </p>

              {/* Toggle 1 */}
              <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-border">
                <span className="text-[14px] text-gray-700 dark:text-gray-300">Enable webhook notifications for store events</span>
                <button
                  onClick={() => setWebhooksEnabled(!webhooksEnabled)}
                  className={`relative w-12 h-7 rounded-full transition-colors cursor-pointer ${webhooksEnabled ? "bg-primary" : "bg-gray-200 dark:bg-secondary"
                    }`}
                >
                  <div
                    className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${webhooksEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                  />
                </button>
              </div>

              {/* Toggle 2 */}
              <div className="flex items-center justify-between py-3">
                <span className="text-[14px] text-gray-700 dark:text-gray-300">Receive email alerts for critical platform events</span>
                <button
                  onClick={() => setEmailAlertsEnabled(!emailAlertsEnabled)}
                  className={`relative w-12 h-7 rounded-full transition-colors cursor-pointer ${emailAlertsEnabled ? "bg-primary" : "bg-gray-200 dark:bg-secondary"
                    }`}
                >
                  <div
                    className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${emailAlertsEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                  />
                </button>
              </div>
            </div>

            {/* API Access */}
            <div className="bg-gray-50 dark:bg-muted rounded-2xl p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-secondary border border-gray-200 dark:border-ring flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="text-[14px] font-medium text-gray-900 dark:text-gray-100">API Documentation</p>
                <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">
                  Access the complete API reference and integration guides at docs.execute.dev
                </p>
              </div>
              <button className="px-4 py-2 text-[13px] font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-secondary border border-gray-200 dark:border-ring rounded-xl hover:bg-gray-50 dark:hover:bg-accent transition-colors cursor-pointer shrink-0">
                View Docs
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 pt-4 border-t border-gray-100 dark:border-border">
            <button className="w-full h-12 bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 text-[14px] font-semibold rounded-xl transition-colors cursor-pointer">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
