import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { dashboard } from '@/assets';
import { useLanguage } from '@/lib/hooks';

export function DashboardPreview() {
  const { t } = useLanguage();

  const perks = [
    {
      left: 'auth.preview.systemHealth',
      right: 'auth.preview.realtimeAlerts',
    },
    {
      left: 'auth.preview.roleAccess',
      right: 'auth.preview.auditLogs',
    },
  ];

  return (
    <div className="w-full max-w-2xl">
      {/* Perks Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-3xl font-bold text-foreground">
            {t('auth.preview.highlights')}
          </h2>
          {/* <Badge variant="success">New</Badge> */}
        </div>
        <div className="space-y-4">
          {perks.map((perk, index) => (
            <motion.div
              key={index + 1}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="grid grid-cols-2 gap-8"
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-6 h-6 bg-success rounded-md flex items-center justify-center mt-0.5 shadow-base">
                  <Check className="w-4 h-4 text-success-foreground" strokeWidth={3} />
                </div>
                <span className="text-sm font-medium text-foreground leading-relaxed">
                  {t(perk.left)}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-6 h-6 bg-success rounded-md flex items-center justify-center mt-0.5 shadow-base">
                  <Check className="w-4 h-4 text-success-foreground" strokeWidth={3} />
                </div>
                <span className="text-sm font-medium text-foreground leading-relaxed">
                  {t(perk.right)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Dashboard Image Preview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="relative group"
      >
        <div className="absolute -inset-1 bg-linear-to-r from-brand-primary to-primary rounded-2xl opacity-20 group-hover:opacity-30 blur transition-opacity duration-300" />
        <motion.img
          src={dashboard}
          alt="Admin Console Preview"
          className="relative w-full h-auto"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
}
