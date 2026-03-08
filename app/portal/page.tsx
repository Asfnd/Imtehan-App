'use client'

import React from 'react'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  FileText, 
  FileUp, 
  CreditCard, 
  Globe, 
  ShieldCheck, 
  Plane, 
  Library, 
  Video, 
  UserCheck, 
  Users, 
  Bell,
  Search,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ChevronRight,
  LogOut,
  User,
  Home
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/card'

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'My Control Panel', href: '#', active: false },
  { icon: FileText, label: 'Application form', href: '#', active: true },
  { icon: FileUp, label: 'Documents', href: '#', active: false },
  { icon: CreditCard, label: 'Payment', href: '#', active: false },
  { icon: Globe, label: 'Visa status', href: '#', active: false },
  { icon: ShieldCheck, label: 'Insurance', href: '#', active: false },
  { icon: Plane, label: 'Travel itinerary', href: '#', active: false },
  { icon: Library, label: 'Resources', href: '#', active: false },
]

const CHECKLIST_ITEMS = [
  { icon: CreditCard, label: 'Payment', status: 'completed', color: 'bg-green-100 text-green-600' },
  { icon: Video, label: 'Upload Video', status: 'pending', color: 'bg-blue-100 text-blue-600' },
  { icon: UserCheck, label: 'Interview', status: 'pending', color: 'bg-orange-100 text-orange-600' },
  { icon: Plane, label: 'Travel Info', status: 'pending', color: 'bg-purple-100 text-purple-600' },
  { icon: ShieldCheck, label: 'Insurance', status: 'pending', color: 'bg-cyan-100 text-cyan-600' },
  { icon: Globe, label: 'Visa', status: 'pending', color: 'bg-indigo-100 text-indigo-600' },
  { icon: Users, label: 'Recruiter info', status: 'pending', color: 'bg-slate-100 text-slate-600' },
]

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900 font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">Imtehan <span className="text-primary">Portal</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <Home className="w-4 h-4" /> Home
          </Link>
          <Link href="/profile" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <User className="w-4 h-4" /> My account
          </Link>
          <button className="hover:text-red-500 transition-colors flex items-center gap-1.5 text-slate-500">
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </div>
      </nav>

      {/* Header Banner */}
      <header className="relative py-12 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
            2026 Summer Camp Exchange Placement
          </h1>
          <p className="text-slate-500 text-lg">Manage your application and track your progress</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="space-y-1">
              {NAV_ITEMS.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                    ${item.active 
                      ? 'bg-primary text-white shadow-md shadow-primary/20 font-semibold' 
                      : 'text-slate-600 hover:bg-white hover:text-primary hover:shadow-sm'
                    }
                  `}
                >
                  <item.icon className={`w-5 h-5 ${item.active ? 'text-white' : 'group-hover:text-primary'}`} />
                  <span className="text-sm">{item.label}</span>
                  {item.active && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>
              ))}
            </div>
            
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl">
              <h4 className="font-bold text-sm mb-2">Need Help?</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">Our support team is available 24/7 to assist you with your application.</p>
              <Button size="sm" variant="outline" className="w-full border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors">
                Contact Support
              </Button>
            </div>
          </aside>

          {/* Content Area */}
          <div className="lg:col-span-9 space-y-8">
            
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold tracking-tight">To Do List for Asfandiyar</h2>
              <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Active Session
              </div>
            </div>

            {/* Main Application Card */}
            <div className="relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary -z-10 transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute top-0 right-0 p-12 -mr-20 -mt-20 bg-white/10 rounded-full blur-3xl" />
              
              <div className="p-8 md:p-10 text-white">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider mb-4 backdrop-blur-md border border-white/10">
                      2026 First Timer
                    </span>
                    <h3 className="text-3xl font-bold mb-2">Application Form</h3>
                    <div className="flex items-center gap-2 text-primary-foreground/90">
                      <span className="text-sm">Status:</span>
                      <span className="px-2.5 py-0.5 rounded-md bg-white/90 text-primary text-xs font-bold shadow-sm">
                        Applied
                      </span>
                    </div>
                  </div>
                  
                  <Button className="bg-white text-primary hover:bg-slate-100 font-bold px-8 shadow-xl shadow-black/10">
                    <Search className="w-4 h-4 mr-2" />
                    Find camps
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <span>Overall Progress</span>
                      <span className="bg-white/20 px-2 py-1 rounded-md">90%</span>
                    </div>
                    <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden border border-white/10">
                      <div className="h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-1000" style={{ width: '90%' }} />
                    </div>
                  </div>

                  <div className="flex justify-around md:justify-end gap-8">
                    <button className="flex flex-col items-center gap-3 group/icon">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover/icon:bg-white group-hover/icon:text-primary transition-all border border-white/10">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-medium opacity-80 group-hover/icon:opacity-100">Submit</span>
                    </button>
                    <button className="flex flex-col items-center gap-3 group/icon">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover/icon:bg-white group-hover/icon:text-primary transition-all border border-white/10">
                        <FileText className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-medium opacity-80 group-hover/icon:opacity-100">Update</span>
                    </button>
                    <button className="flex flex-col items-center gap-3 group/icon">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover/icon:bg-white group-hover/icon:text-primary transition-all border border-white/10">
                        <Search className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-medium opacity-80 group-hover/icon:opacity-100">View</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning / Notification Section */}
            <Card className="p-6 border-l-4 border-l-orange-500 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Action Required: Form Incomplete</h4>
                    <p className="text-sm text-slate-500 mt-1">
                      Step 6: <span className="font-semibold text-slate-700">Reference Verification</span> needs your attention.
                    </p>
                  </div>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl px-6 group">
                  Complete step 6 now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>

            {/* Grid of items */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-bold tracking-tight">Other items needed to be completed</h3>
                <div className="h-px flex-1 bg-slate-200" />
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {CHECKLIST_ITEMS.map((item, idx) => (
                  <button key={idx} className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-white border border-slate-100 hover:border-primary hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                    <div className={`w-14 h-14 rounded-full ${item.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[12px] font-semibold text-slate-700 text-center">{item.label}</span>
                    {item.status === 'completed' && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 fill-green-50" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* Messages Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold tracking-tight">Important Messages</h3>
                <Link href="#" className="text-sm font-semibold text-primary hover:underline">View All</Link>
              </div>
              
              <Card className="p-8 text-center bg-slate-50 border-dashed border-2 border-slate-200">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-6 h-6 text-slate-400" />
                </div>
                <h4 className="font-bold text-slate-900 mb-1">No messages right now</h4>
                <p className="text-sm text-slate-500">Please check back later for updates on your application status.</p>
              </Card>
            </section>

          </div>
        </div>
      </main>

      {/* Modern Footer */}
      <footer className="mt-20 bg-slate-900 text-slate-400 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center md:text-left">
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-4">Phone Support</p>
              <p className="text-lg font-semibold text-white">1 (908) 628-0527</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-4">Toll Free</p>
              <p className="text-lg font-semibold text-white">(888) 724-4292</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-4">Email Address</p>
              <p className="text-lg font-semibold text-white">info@imtehan.org</p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Partner icons placeholders */}
             <div className="h-8 w-24 bg-slate-800 rounded animate-pulse" />
             <div className="h-8 w-32 bg-slate-800 rounded animate-pulse" />
             <div className="h-8 w-28 bg-slate-800 rounded animate-pulse" />
             <div className="h-8 w-20 bg-slate-800 rounded animate-pulse" />
             <div className="h-8 w-24 bg-slate-800 rounded animate-pulse" />
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
            <p>&copy; 2026 Imtehan Exchange Program. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
