import React, { useState, useEffect } from 'react';
import { Users, Package, ShoppingBag, TrendingUp, CheckCircle, XCircle, Clock, Mail, Phone, Briefcase, Store, MapPin, Eye } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { AnimatedCard, AnimatedCardContent } from '@/components/ui/AnimatedCard';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface TailorApplication {
  id: string;
  user_id: string;
  shop_name: string;
  shop_address: string;
  years_experience: number;
  specializations: string[];
  portfolio_url: string | null;
  phone: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  profiles: {
    full_name: string;
    user_id: string;
  };
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<TailorApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<TailorApplication | null>(null);
  const [rejectNotes, setRejectNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const stats = [
    { label: 'Total Users', value: '2,456', icon: Users, color: 'from-primary to-rose', change: '+12%' },
    { label: 'Active Orders', value: '189', icon: Package, color: 'from-gold to-coral', change: '+8%' },
    { label: 'Pending Applications', value: applications.filter(a => a.status === 'pending').length.toString(), icon: Clock, color: 'from-amber-400 to-amber-600', change: '' },
    { label: 'Active Tailors', value: applications.filter(a => a.status === 'approved').length.toString(), icon: ShoppingBag, color: 'from-mint to-secondary', change: '+5%' },
  ];

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('tailor_applications')
        .select(`
          *,
          profiles!inner(full_name, user_id)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching applications:', error);
        toast.error('Failed to load applications');
        return;
      }

      setApplications(data as TailorApplication[]);
    } catch (err) {
      console.error('Error:', err);
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (applicationId: string) => {
    if (!user) return;

    setIsProcessing(true);
    try {
      const { error } = await supabase.rpc('approve_tailor_application', {
        application_id: applicationId,
        admin_id: user.id,
      });

      if (error) {
        console.error('Approval error:', error);
        toast.error('Failed to approve application');
        return;
      }

      toast.success('Application approved successfully!');
      fetchApplications();
    } catch (err) {
      console.error('Error:', err);
      toast.error('An error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async (applicationId: string) => {
    if (!user) return;

    setIsProcessing(true);
    try {
      const { error } = await supabase.rpc('reject_tailor_application', {
        application_id: applicationId,
        admin_id: user.id,
        notes: rejectNotes || null,
      });

      if (error) {
        console.error('Rejection error:', error);
        toast.error('Failed to reject application');
        return;
      }

      toast.success('Application rejected');
      setRejectNotes('');
      setSelectedApp(null);
      fetchApplications();
    } catch (err) {
      console.error('Error:', err);
      toast.error('An error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const pendingApplications = applications.filter(app => app.status === 'pending');
  const approvedApplications = applications.filter(app => app.status === 'approved');
  const rejectedApplications = applications.filter(app => app.status === 'rejected');

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gold/20 via-primary/10 to-mint/20 p-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage StitchMate platform and tailor applications</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <AnimatedCard key={stat.label} hoverEffect="lift" className={`animate-slide-up stagger-${index + 1}`}>
              <AnimatedCardContent className="pt-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg mb-4`}>
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  {stat.change && <span className="text-xs text-mint">{stat.change}</span>}
                </div>
              </AnimatedCardContent>
            </AnimatedCard>
          );
        })}
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Tailor Applications</h2>
          <Button variant="outline" onClick={fetchApplications} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Refresh'}
          </Button>
        </div>

        {pendingApplications.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              Pending Applications ({pendingApplications.length})
            </h3>
            <div className="grid gap-4">
              {pendingApplications.map((app) => (
                <ApplicationCard
                  key={app.id}
                  application={app}
                  onApprove={handleApprove}
                  onReject={() => setSelectedApp(app)}
                  isProcessing={isProcessing}
                />
              ))}
            </div>
          </div>
        )}

        {approvedApplications.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Approved Tailors ({approvedApplications.length})
            </h3>
            <div className="grid gap-4">
              {approvedApplications.map((app) => (
                <ApplicationCard key={app.id} application={app} readonly />
              ))}
            </div>
          </div>
        )}

        {rejectedApplications.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              Rejected Applications ({rejectedApplications.length})
            </h3>
            <div className="grid gap-4">
              {rejectedApplications.map((app) => (
                <ApplicationCard key={app.id} application={app} readonly />
              ))}
            </div>
          </div>
        )}

        {!isLoading && applications.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No tailor applications yet
          </div>
        )}
      </div>

      <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Application</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject this application? You can optionally provide a reason.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="notes">Rejection Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Provide feedback for the applicant..."
                value={rejectNotes}
                onChange={(e) => setRejectNotes(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setSelectedApp(null)} disabled={isProcessing}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedApp && handleReject(selectedApp.id)}
              disabled={isProcessing}
            >
              {isProcessing ? 'Rejecting...' : 'Reject Application'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface ApplicationCardProps {
  application: TailorApplication;
  onApprove?: (id: string) => void;
  onReject?: () => void;
  isProcessing?: boolean;
  readonly?: boolean;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  onApprove,
  onReject,
  isProcessing,
  readonly,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const statusColors = {
    pending: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    approved: 'bg-green-500/10 text-green-500 border-green-500/20',
    rejected: 'bg-red-500/10 text-red-500 border-red-500/20',
  };

  return (
    <AnimatedCard variant="bordered" hoverEffect="lift">
      <AnimatedCardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h4 className="text-lg font-semibold">{application.profiles.full_name}</h4>
              <Badge className={statusColors[application.status]}>
                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
              </Badge>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4" />
                <span>{application.shop_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>{application.years_experience} years experience</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>

        {showDetails && (
          <div className="mb-4 p-4 bg-muted/50 rounded-lg space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{application.shop_address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{application.phone}</span>
            </div>
            {application.specializations && application.specializations.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {application.specializations.map((spec, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {spec}
                  </Badge>
                ))}
              </div>
            )}
            {application.portfolio_url && (
              <a
                href={application.portfolio_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline block"
              >
                View Portfolio
              </a>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              Applied: {new Date(application.created_at).toLocaleDateString()}
            </p>
          </div>
        )}

        {!readonly && application.status === 'pending' && (
          <div className="flex gap-3">
            <Button
              onClick={() => onApprove?.(application.id)}
              disabled={isProcessing}
              className="flex-1"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve
            </Button>
            <Button
              variant="destructive"
              onClick={onReject}
              disabled={isProcessing}
              className="flex-1"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject
            </Button>
          </div>
        )}
      </AnimatedCardContent>
    </AnimatedCard>
  );
};

export default AdminDashboard;
