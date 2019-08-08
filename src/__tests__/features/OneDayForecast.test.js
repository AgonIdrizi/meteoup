import React from 'react'

import { render, cleanup, fireEvent,wait, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import App from  '../../App'
import {LoginRegisterProvider, LoginRegisterContext} from '../../contexts/LoginRegisterContext'
afterEach(cleanup)


it('changes color and width on click', async () => {
    const { container, getByTestId } = render(<LoginRegisterProvider>
                                                <LoginRegisterContext.Consumer> 
                                                    {({authListener, user, loggedIn}) => 
                                                        <App user={user} loggedIn={loggedIn} authListener={authListener} />
                                                    }  
                                                </LoginRegisterContext.Consumer>
                                              </LoginRegisterProvider>)    
    const sevenDayForecastDiv = await waitForElement(() => getByTestId('sevenDayForecast') ) 
    
    expect(sevenDayForecastDiv.firstChild.style.backgroundColor).toBe('white')

    const oneDayForecastLastDiv = sevenDayForecastDiv.lastChild
    fireEvent.click(oneDayForecastLastDiv)
    
    expect(oneDayForecastLastDiv.style.backgroundColor).toBe('white')
    expect(oneDayForecastLastDiv.style.width).toBe('105%')
    
    expect(sevenDayForecastDiv.firstChild.style.width).toEqual('100%')
})