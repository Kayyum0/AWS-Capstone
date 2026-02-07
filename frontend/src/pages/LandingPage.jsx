import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Shield, Activity, ArrowRight, Star, Clock, Users } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, color }) => (
    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${color}`}>
            <Icon className="h-7 w-7 text-white" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
);

const LandingPage = () => {
    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-28 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-36 bg-gradient-to-b from-blue-50/50 to-white">
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 text-blue-700 font-medium text-sm mb-8 border border-blue-100">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        New: Telemedicine Integration Available
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-8">
                        Healthcare Reimagined <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            For the Digital Age
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10 leading-normal">
                        A secure, cloud-native portal for effortless appointment scheduling, real-time medical records, and seamless doctor-patient communication.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group">
                            Find a Doctor
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/doctor/register" className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-600 border border-indigo-200 rounded-full font-bold text-lg hover:bg-indigo-50 transition-colors shadow-sm">
                            Join as a Doctor
                        </Link>
                    </div>

                    <div className="mt-16 flex items-center justify-center gap-8 text-slate-400 grayscale opacity-70">
                        {/* Simple logos placeholder */}
                        <span className="text-xl font-bold">MediCare</span>
                        <span className="text-xl font-bold">HealthPlus</span>
                        <span className="text-xl font-bold">DocConnect</span>
                        <span className="text-xl font-bold">SecureHealth</span>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 -z-10 animate-blob"></div>
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-200 rounded-full blur-3xl opacity-20 -z-10 animate-blob animation-delay-2000"></div>
            </section>

            {/* Stats Section */}
            <section className="py-10 bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-800">
                        <div className="p-4">
                            <div className="text-3xl font-bold text-blue-400 mb-1">10k+</div>
                            <div className="text-slate-400 text-sm">Active Patients</div>
                        </div>
                        <div className="p-4">
                            <div className="text-3xl font-bold text-blue-400 mb-1">500+</div>
                            <div className="text-slate-400 text-sm">Specialists</div>
                        </div>
                        <div className="p-4">
                            <div className="text-3xl font-bold text-blue-400 mb-1">99.9%</div>
                            <div className="text-slate-400 text-sm">Uptime</div>
                        </div>
                        <div className="p-4">
                            <div className="text-3xl font-bold text-blue-400 mb-1">24/7</div>
                            <div className="text-slate-400 text-sm">Support</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase mb-2">Key Features</h2>
                        <p className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Everything you need to manage your health</p>
                        <p className="text-lg text-slate-600">Built on AWS for enterprise-grade security and reliability.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={Calendar}
                            color="bg-blue-500"
                            title="Instant Booking"
                            description="Book appointments with top specialists in seconds. View real-time availability and manage your schedule effortlessly."
                        />
                        <FeatureCard
                            icon={Shield}
                            color="bg-emerald-500"
                            title="Secure Records"
                            description="Your medical history, prescriptions, and lab results are encrypted and stored securely using AWS DynamoDB."
                        />
                        <FeatureCard
                            icon={Activity}
                            color="bg-violet-500"
                            title="Real-time Monitoring"
                            description="Track your vitals and treatment progress with intuitive dashboards. Receive immediate updates via AWS SNS."
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-blue-600 rounded-3xl p-10 sm:p-16 text-center text-white relative overflow-hidden shadow-2xl">
                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to take control of your health?</h2>
                            <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg">
                                Join thousands of patients who trust our platform for their healthcare needs. Sign up today and experience the difference.
                            </p>
                            <Link to="/register" className="inline-block px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg">
                                Create Free Account
                            </Link>
                        </div>

                        {/* Background decorations */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500 rounded-full opacity-50 mix-blend-multiply filter blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-700 rounded-full opacity-50 mix-blend-multiply filter blur-3xl"></div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
