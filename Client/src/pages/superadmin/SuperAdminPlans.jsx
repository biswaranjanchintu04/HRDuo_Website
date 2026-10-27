import React, { useState } from 'react';
import { 
  CreditCard, Check, Plus, Edit2, Shield, Users, 
  Sparkles, DollarSign, ArrowUpRight, Zap 
} from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useAlert } from '../../context/AlertContext';

export default function SuperAdminPlans() {
  const { plans } = useHRMS();
  const { showToast } = useAlert();
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'

  const handleEditPlan = (plan) => {
    showToast(`Editing plan parameters for ${plan.name} (Simulation)`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Subscription Plans & Packaging</h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure multi-tenant SaaS tiers, seat limits, pricing matrices, and premium add-ons.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-bold">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                billingCycle === 'annual' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Annual (Save 20%)
            </button>
          </div>

          <button
            onClick={() => showToast('Create Custom Plan modal opened (Demo)', 'info')}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-blue-500/20"
          >
            <Plus size={14} />
            <span>Create New Plan</span>
          </button>
        </div>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-3xl p-6 border flex flex-col justify-between transition-all hover:shadow-xl relative ${
              plan.isPopular
                ? 'border-blue-500 shadow-lg shadow-blue-500/5 ring-2 ring-blue-500/10'
                : 'border-slate-200/80 shadow-2xs'
            }`}
          >
            {plan.isPopular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                Most Popular Tier
              </span>
            )}

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {plan.id}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {plan.status}
                </span>
              </div>

              <h3 className="text-xl font-black text-slate-900">{plan.name}</h3>
              <p className="text-xs text-slate-500 mt-1 min-h-[36px]">{plan.description}</p>

              <div className="my-5 pb-5 border-b border-slate-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900 tracking-tight">
                    {billingCycle === 'monthly' ? plan.price : plan.annualPrice.split('/')[0]}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">
                    {billingCycle === 'monthly' ? plan.period : '/year'}
                  </span>
                </div>
                <div className="text-[11px] text-blue-600 font-bold mt-1">
                  {plan.subscribers} Active Subscribers • {plan.mrr} MRR
                </div>
              </div>

              <div className="space-y-2.5 mb-6">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Included Capabilities:
                </span>
                {plan.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                    <div className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Check size={10} className="stroke-[3]" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => handleEditPlan(plan)}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Edit2 size={13} />
                <span>Configure Plan</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
