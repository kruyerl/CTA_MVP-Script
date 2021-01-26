import React from 'react'
import { render } from 'react-dom'
import Injector from './Injector'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

render(
    <React.StrictMode>
        <Injector />
    </React.StrictMode>,
    document.getElementById('cta-goes-here')
)

// Parcel Hot Module Reloading
if (module.hot) {
    module.hot.accept()
}
