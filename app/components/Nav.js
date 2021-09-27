import React from 'react';
import { ThemeConsumer } from '../contexts/theme';

export default function Nav(){

    return (
        <ThemeConsumer>
            {({theme, toggleTheme })=> (
                <nav class="row space-between">
                    <button 
                    style={{fontSize: 30}}
                    className="btn-clear"
                    onClick={toggleTheme}>
                        {theme === 'light'? 'LIGHT': 'DARK'}
                    </button>
                </nav>
            )}
        </ThemeConsumer>
    )

}