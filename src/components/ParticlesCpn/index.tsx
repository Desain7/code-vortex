import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
// 粒子效果
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { Engine } from 'tsparticles-engine'

interface IProps {
  children?: ReactNode
}
const particlesInit = async (main: Engine) => {
  console.log(main)

  // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
  // starting from v2 you can add only the features you need reducing the bundle size
  await loadFull(main)
}
const ParticlesCpn: FC<IProps> = () => {
  return (
    <div>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: {
            enable: true,
            zIndex: -99
          },
          particles: {
            number: {
              value: 10,
              density: {
                enable: false,
                value_area: 800
              }
            },
            color: {
              value: '#fff'
            },
            shape: {
              type: 'dot'
            },
            opacity: {
              value: 0.8,
              random: false,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
              }
            },
            size: {
              value: 2,
              random: true,
              anim: {
                enable: false,
                speed: 20,
                size_min: 0.01,
                sync: false
              }
            },
            rotate: {
              value: 0,
              random: true,
              direction: 'clockwise',
              animation: {
                enable: true,
                speed: 5,
                sync: false
              }
            },
            line_linked: {
              enable: true,
              distance: 600,
              color: '#000',
              opacity: 0.4,
              width: 2
            },
            move: {
              enable: true,
              speed: 1,
              direction: 'none',
              random: false,
              straight: false,
              out_mode: 'out',
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
              }
            }
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: ['grab']
              },
              onclick: {
                enable: false,
                mode: 'bubble'
              },
              resize: true
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1
                }
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
              },
              repulse: {
                distance: 200
              },
              push: {
                particles_nb: 4
              },
              remove: {
                particles_nb: 2
              }
            }
          },
          retina_detect: true,
          background: {
            color: '#fff',
            image: '',
            position: '50% 50%',
            repeat: 'no-repeat',
            size: 'cover'
          }
        }}
      />
    </div>
  )
}

export default memo(Particles)
