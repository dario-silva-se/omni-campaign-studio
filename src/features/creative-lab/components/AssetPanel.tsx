import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import type { CreativeAsset } from '@/types'

interface Props {
  assets: CreativeAsset[]
}

export function AssetPanel({ assets }: Props) {
  const { t } = useTranslation('creativeLab')

  const imageAssets = assets.filter((a) => a.type === 'image')
  const videoAssets = assets.filter((a) => a.type === 'video')

  return (
    <div className="glass-card p-lg rounded-xl flex flex-col gap-sm">
      <h3 className="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-2">
        <Icon name="perm_media" className="text-[16px]" />
        {t('mediaAssets.title')}
      </h3>
      <div className="mt-2 flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-2">
          {imageAssets.map((asset) => (
            <div
              key={asset.id}
              className="aspect-square rounded-lg bg-surface-container-highest border border-outline-variant/20 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-surface-variant/40 to-primary/5 flex items-center justify-center">
                <Icon name="image" className="text-on-surface-variant/30" />
              </div>
              <div className="absolute inset-0 bg-surface-container-lowest/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  className="p-1.5 rounded-full bg-error-container text-on-error-container hover:scale-110 transition-transform"
                >
                  <Icon name="delete" className="text-[18px]" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-surface-container-lowest/80 p-1">
                <p className="text-[9px] font-label-caps text-center text-on-surface-variant truncate">
                  {asset.name}
                </p>
              </div>
            </div>
          ))}
          <div className="aspect-square rounded-lg border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group">
            <Icon name="add_photo_alternate" className="text-on-surface-variant/60 group-hover:text-primary transition-colors" />
            <span className="text-[10px] font-label-caps text-on-surface-variant/60 mt-1">
              {t('mediaAssets.addMore')}
            </span>
          </div>
        </div>
        {videoAssets.map((asset) => (
          <div
            key={asset.id}
            className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/10 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
              <Icon name="movie" className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-on-surface truncate">{asset.name}</p>
              {asset.progress !== undefined && (
                <div className="w-full bg-surface-container-highest h-1 rounded-full mt-1 overflow-hidden">
                  <div
                    className="bg-primary h-full"
                    style={{ width: `${asset.progress}%` }}
                  />
                </div>
              )}
            </div>
            <button type="button" className="text-on-surface-variant/60 hover:text-on-surface transition-colors">
              <Icon name="close" className="text-[18px]" />
            </button>
          </div>
        ))}
        <p className="font-label-caps text-label-caps text-on-surface-variant/40 text-center lowercase mt-1">
          {t('mediaAssets.hint')}
        </p>
      </div>
    </div>
  )
}
