import React, { useState } from 'react';
import { User, Camera, MapPin, Phone, Mail, Clock, Save, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCard, AnimatedCardContent, AnimatedCardHeader, AnimatedCardTitle } from '@/components/ui/AnimatedCard';
import { AnimatedInput } from '@/components/ui/AnimatedInput';

/**
 * TailorProfile - Profile setup page for tailors
 */
const TailorProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [profile, setProfile] = useState({
    shopName: 'Master Ali Tailors',
    ownerName: 'Ali Hassan',
    phone: '+92 300 1234567',
    email: 'ali@mastertailors.pk',
    address: 'Shop #12, Fashion Street, Lahore',
    experience: '15 years',
    speciality: 'Bridal Wear, Traditional Pakistani',
    openingHours: '10:00 AM - 8:00 PM',
  });

  const specialities = [
    'Bridal Wear',
    'Traditional Pakistani',
    'Western Formal',
    'Kids Wear',
    'Alterations',
    'Embroidery',
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <User className="w-8 h-8 text-secondary-foreground" />
          My Profile
        </h1>
        <p className="text-muted-foreground">Manage your shop information and profile</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Picture & Basic Info */}
        <AnimatedCard variant="bordered" className="lg:col-span-1">
          <AnimatedCardContent className="pt-6 text-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-secondary to-mint flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-16 h-16 text-secondary-foreground" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform">
                <Camera className="w-5 h-5 text-primary-foreground animate-wiggle" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => setProfileImage(ev.target?.result as string);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>

            <h2 className="text-xl font-bold mt-4">{profile.shopName}</h2>
            <p className="text-muted-foreground">{profile.ownerName}</p>

            <div className="flex items-center justify-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${star <= 4 ? 'text-gold fill-gold' : 'text-muted'}`}
                />
              ))}
              <span className="ml-2 text-sm font-medium">4.9</span>
            </div>

            <div className="mt-6 text-left space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{profile.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span>{profile.openingHours}</span>
              </div>
            </div>
          </AnimatedCardContent>
        </AnimatedCard>

        {/* Edit Form */}
        <AnimatedCard variant="bordered" className="lg:col-span-2">
          <AnimatedCardHeader className="flex flex-row items-center justify-between">
            <AnimatedCardTitle>Shop Information</AnimatedCardTitle>
            <Button
              variant={isEditing ? 'default' : 'outline'}
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? <Save className="w-4 h-4 mr-2" /> : null}
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </AnimatedCardHeader>
          <AnimatedCardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <AnimatedInput
                label="Shop Name"
                value={profile.shopName}
                onChange={(e) => setProfile({ ...profile, shopName: e.target.value })}
                disabled={!isEditing}
              />
              <AnimatedInput
                label="Owner Name"
                value={profile.ownerName}
                onChange={(e) => setProfile({ ...profile, ownerName: e.target.value })}
                disabled={!isEditing}
              />
              <AnimatedInput
                label="Phone Number"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                disabled={!isEditing}
              />
              <AnimatedInput
                label="Email Address"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <AnimatedInput
              label="Shop Address"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              disabled={!isEditing}
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <AnimatedInput
                label="Years of Experience"
                value={profile.experience}
                onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                disabled={!isEditing}
              />
              <AnimatedInput
                label="Opening Hours"
                value={profile.openingHours}
                onChange={(e) => setProfile({ ...profile, openingHours: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            {/* Specialities */}
            <div>
              <p className="text-sm font-medium mb-3">Specialities</p>
              <div className="flex flex-wrap gap-2">
                {specialities.map((spec) => (
                  <span
                    key={spec}
                    className={`
                      px-3 py-1.5 rounded-full text-sm cursor-pointer transition-all
                      ${profile.speciality.includes(spec)
                        ? 'bg-secondary text-secondary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }
                      ${isEditing ? 'hover:scale-105' : ''}
                    `}
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedCardContent>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default TailorProfile;
