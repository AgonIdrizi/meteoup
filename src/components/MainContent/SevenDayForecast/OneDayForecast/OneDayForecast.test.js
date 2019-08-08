import React from 'react'

import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import OneDayForecast from './OneDayForecast'
import { forecast} from '../../../../data/apixuForecastData'

afterEach(cleanup)

const data = forecast['forecastday'][0]
    
    it('renders correctly', () => {
        const { asFragment } = render(<OneDayForecast data={data} />);
       
        expect(asFragment()).toMatchSnapshot();
        
    })

    it('has correct datas', () => {
        const { container, getByTestId } = render(<OneDayForecast data={data} />)

        const dateDiv = container.querySelector('.Date')
        expect(dateDiv).toHaveTextContent('6/26')
        expect(dateDiv).toHaveTextContent('Wed')
    })

   



