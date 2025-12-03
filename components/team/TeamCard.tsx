import Image from 'next/image';

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  photo: string;
  socials?: { platform: string; url: string }[];
}

export function TeamCard({ name, role, bio, photo, socials = [] }: TeamCardProps) {
  return (
    <div className="glass-panel h-full p-5">
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/10">
          <Image src={photo} alt={name} fill className="object-cover" sizes="56px" />
        </div>
        <div>
          <p className="text-base font-semibold text-white">{name}</p>
          <p className="text-sm text-emerald-200">{role}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-slate-300">{bio}</p>
      {socials.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold text-emerald-200">
          {socials.map((social) => (
            <a key={social.platform} href={social.url} className="hover:underline">
              {social.platform}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
