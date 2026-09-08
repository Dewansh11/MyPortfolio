const BORDER = '2px solid #2C2C2A'
const CHIP_SHADOW = '3px 3px 0px 0px #2C2C2A'

function BeforeLabel() {
  return (
    <p
      style={{
        margin: 0,
        width: 'fit-content',
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: '#9C9A92',
      }}
    >
      Before
    </p>
  )
}

function AfterLabel() {
  return (
    <p
      style={{
        margin: 0,
        width: 'fit-content',
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: '#B5490F',
      }}
    >
      After
    </p>
  )
}

function DiscoverDiagram() {
  const beforeSize = 24
  const afterSize = 30
  const afterGap = 50
  const dropLabelHeight = 13
  const circleLineTop = dropLabelHeight + beforeSize / 2

  return (
    <div style={{ marginTop: 24, width: '100%' }}>
      <BeforeLabel />

      <div
        style={{
          position: 'relative',
          width: '100%',
          marginTop: 10,
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: circleLineTop,
            height: 2,
            background: '#C4C2BA',
            transform: 'translateY(-50%)',
            zIndex: 0,
          }}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7].map(num => {
            const isDropOff = num === 3 || num === 5

            return (
              <div
                key={num}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  width: 'fit-content',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {isDropOff ? (
                  <span
                    style={{
                      marginBottom: 4,
                      fontSize: 9,
                      fontWeight: 600,
                      color: '#EA580C',
                    }}
                  >
                    flagged
                  </span>
                ) : (
                  <span
                    aria-hidden="true"
                    style={{
                      marginBottom: 4,
                      height: dropLabelHeight - 4,
                      visibility: 'hidden',
                      fontSize: 9,
                    }}
                  >
                    flagged
                  </span>
                )}
                <div
                  style={{
                    display: 'flex',
                    width: beforeSize,
                    height: beforeSize,
                    flexShrink: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    border: isDropOff ? '2px solid #EA580C' : BORDER,
                    background: isDropOff ? '#FBE3D3' : '#F1EFE8',
                    fontSize: 10,
                    fontWeight: 700,
                    color: '#2C2C2A',
                  }}
                >
                  {num}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{ marginTop: 20, width: 'fit-content' }}>
        <AfterLabel />

        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-start',
            gap: afterGap,
            width: 'fit-content',
            marginTop: 10,
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: afterSize / 2,
              right: afterSize / 2,
              top: afterSize / 2,
              height: 2,
              background: '#EA580C',
              zIndex: 0,
            }}
          />

          {[1, 2, 3].map(num => (
            <div
              key={num}
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                width: afterSize,
                height: afterSize,
                flexShrink: 0,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                border: BORDER,
                background: '#EA580C',
                fontSize: 12,
                fontWeight: 700,
                color: '#4A1B0C',
              }}
            >
              {num}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DecideDiagram() {
  const pillBase = {
    width: 'fit-content' as const,
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderRadius: 9999,
    border: BORDER,
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 11,
    fontWeight: 600,
    color: '#2C2C2A',
    boxShadow: CHIP_SHADOW,
  }

  return (
    <div style={{ marginTop: 24, width: 'fit-content' }}>
      <BeforeLabel />

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
          width: 'fit-content',
          marginTop: 10,
        }}
      >
        <span style={{ ...pillBase, height: 28, background: '#F1EFE8' }}>Skip</span>
        <span style={{ ...pillBase, height: 28, background: '#F1EFE8' }}>Continue</span>
      </div>

      <div style={{ marginTop: 20, width: 'fit-content' }}>
        <AfterLabel />
        <span
          style={{
            ...pillBase,
            display: 'flex',
            height: 34,
            marginTop: 10,
            paddingLeft: 28,
            paddingRight: 28,
            background: '#EA580C',
            fontSize: 12,
            fontWeight: 700,
            color: '#4A1B0C',
          }}
        >
          Continue
        </span>
      </div>
    </div>
  )
}

function ActChip({
  label,
  accent = false,
}: {
  label: string
  accent?: boolean
}) {
  return (
    <span
      style={{
        width: 'fit-content',
        borderRadius: 10,
        border: BORDER,
        background: accent ? '#EA580C' : '#F1EFE8',
        padding: '6px 12px',
        fontSize: 10,
        fontWeight: accent ? 700 : 600,
        color: accent ? '#4A1B0C' : '#2C2C2A',
        boxShadow: CHIP_SHADOW,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  )
}

function FlowArrow({ accent = false }: { accent?: boolean }) {
  return (
    <span
      aria-hidden="true"
      style={{
        fontSize: 14,
        fontWeight: 700,
        lineHeight: 1,
        color: accent ? '#EA580C' : '#9C9A92',
      }}
    >
      →
    </span>
  )
}

function ActDiagram() {
  return (
    <div style={{ marginTop: 24, width: 'fit-content' }}>
      <BeforeLabel />

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 8,
          width: 'fit-content',
          marginTop: 10,
        }}
      >
        <ActChip label="Sign Up" />
        <FlowArrow />
        <ActChip label="Verify ID" />
        <FlowArrow />
        <ActChip label="See Markets" />
      </div>

      <div style={{ marginTop: 20, width: 'fit-content' }}>
        <AfterLabel />

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 8,
            width: 'fit-content',
            marginTop: 10,
          }}
        >
          <ActChip label="Sign Up" />
          <FlowArrow accent />
          <ActChip label="See Markets" accent />
          <FlowArrow accent />
          <ActChip label="Verify ID" accent />
        </div>
      </div>
    </div>
  )
}

export function KeyDecisionDiagram({ stepNumber }: { stepNumber: string }) {
  switch (stepNumber) {
    case '01':
      return <DiscoverDiagram />
    case '02':
      return <DecideDiagram />
    case '03':
      return <ActDiagram />
    default:
      return null
  }
}
