import * as React from 'react'

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
  strokeWidth?: number | string
  className?: string
}

/**
 * VerticalLift (STOLIFT / Vertical Lift Module)
 * Visualizes a vertical dual-tower casing with central extractor tray
 */
export const VerticalLift = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, strokeWidth = 1.75, className = '', ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Outer vertical enclosure */}
      <rect x="4" y="2" width="16" height="20" rx="2" />
      {/* Left and right internal storage shelf slots */}
      <line x1="7" y1="6" x2="9" y2="6" />
      <line x1="7" y1="10" x2="9" y2="10" />
      <line x1="7" y1="14" x2="9" y2="14" />
      <line x1="7" y1="18" x2="9" y2="18" />
      <line x1="15" y1="6" x2="17" y2="6" />
      <line x1="15" y1="10" x2="17" y2="10" />
      <line x1="15" y1="14" x2="17" y2="14" />
      <line x1="15" y1="18" x2="17" y2="18" />
      {/* Center elevator extractor tray */}
      <rect x="10" y="11" width="4" height="2" rx="0.5" />
      {/* Vertical lift guide path */}
      <line x1="12" y1="4" x2="12" y2="20" strokeDasharray="1 2" opacity="0.6" />
    </svg>
  )
)
VerticalLift.displayName = 'VerticalLift'

/**
 * MobileCompactor (STOMAT Compactors / High-Density Movable Racks)
 * Visualizes movable shelving bays on floor rails with mechanical movement
 */
export const MobileCompactor = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, strokeWidth = 1.75, className = '', ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Bottom floor guide rail */}
      <line x1="2" y1="20" x2="22" y2="20" />
      <circle cx="5" cy="20" r="1" />
      <circle cx="11" cy="20" r="1" />
      <circle cx="17" cy="20" r="1" />
      {/* Shelving bay 1 (Fixed) */}
      <rect x="3" y="4" width="4" height="14" rx="1" />
      <line x1="4.5" y1="9" x2="5.5" y2="9" />
      <line x1="4.5" y1="13" x2="5.5" y2="13" />
      {/* Shelving bay 2 (Mobile with handwheel) */}
      <rect x="9" y="4" width="4" height="14" rx="1" />
      <circle cx="11" cy="11" r="1" />
      {/* Shelving bay 3 (Mobile) */}
      <rect x="15" y="4" width="4" height="14" rx="1" />
      <circle cx="17" cy="11" r="1" />
      {/* Lateral compaction arrow indicator */}
      <path d="M20 7l2 2-2 2" />
    </svg>
  )
)
MobileCompactor.displayName = 'MobileCompactor'

/**
 * Shuttle (Automated Pallet / Bin Shuttle)
 * Visualizes a low-profile multi-directional shuttle navigating storage lanes
 */
export const Shuttle = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, strokeWidth = 1.75, className = '', ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Storage rack channel rails */}
      <line x1="2" y1="18" x2="22" y2="18" />
      <line x1="2" y1="8" x2="22" y2="8" strokeDasharray="2 2" opacity="0.4" />
      {/* Shuttle chassis */}
      <rect x="5" y="11" width="14" height="5" rx="1" />
      {/* Shuttle drive wheels */}
      <circle cx="8" cy="17" r="1" />
      <circle cx="16" cy="17" r="1" />
      {/* Cargo tote / pallet payload */}
      <path d="M7 11V7a1 1 0 011-1h8a1 1 0 011 1v4" />
      {/* Horizontal directional movement indicators */}
      <path d="M2 13.5h2M20 13.5h2" />
    </svg>
  )
)
Shuttle.displayName = 'Shuttle'

/**
 * StackerCrane (High-Bay Warehouse ASRS Mast Crane)
 * Visualizes vertical mast, top/bottom rails, and telescoping fork carriage
 */
export const StackerCrane = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, strokeWidth = 1.75, className = '', ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Top and bottom guide tracks */}
      <line x1="2" y1="3" x2="22" y2="3" />
      <line x1="2" y1="21" x2="22" y2="21" />
      {/* Dual vertical mast columns */}
      <line x1="8" y1="3" x2="8" y2="21" />
      <line x1="11" y1="3" x2="11" y2="21" />
      {/* Mast lattice cross-bracing */}
      <line x1="8" y1="7" x2="11" y2="10" />
      <line x1="8" y1="13" x2="11" y2="16" />
      {/* Lifting carriage and telescopic forks */}
      <rect x="6.5" y="10" width="6" height="4" rx="0.5" />
      <path d="M12.5 12h7m0 0l-2-2m2 2l-2 2" />
      {/* Bottom travel bogie wheel */}
      <circle cx="9.5" cy="21" r="1.5" />
    </svg>
  )
)
StackerCrane.displayName = 'StackerCrane'
