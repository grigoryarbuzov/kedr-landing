import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import KedrLanding from './App'
import './index.css'

document.documentElement.classList.add('js-ready')
hydrateRoot(document.getElementById('root'), <KedrLanding />)
