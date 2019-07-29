import React from 'react'

import { render, cleanup, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import OneDayForecast from './OneDayForecast'


afterEach(cleanup)

const data = {
    "date": "2019-07-27",
    "date_epoch": 1564185600,
    "day": {
        "maxtemp_c": 30.3,
        "maxtemp_f": 86.5,
        "mintemp_c": 12.2,
        "mintemp_f": 54.0,
        "avgtemp_c": 23.7,
        "avgtemp_f": 74.6,
        "maxwind_mph": 4.7,
        "maxwind_kph": 7.6,
        "totalprecip_mm": 3.3,
        "totalprecip_in": 0.13,
        "avgvis_km": 9.6,
        "avgvis_miles": 5.0,
        "avghumidity": 57.0,
        "condition": {
            "text": "Moderate or heavy rain shower",
            "icon": "//cdn.apixu.com/weather/64x64/day/356.png",
            "code": 1243
        },
        "uv": 9.2
    },
    "astro": {
        "sunrise": "05:24 AM",
        "sunset": "08:01 PM",
        "moonrise": "01:01 AM",
        "moonset": "03:31 PM"
    }
}
    
    it('renders correctly', () => {
        const { asFragment, getByTestId } = render(<OneDayForecast data={data} />);
        expect(asFragment()).toMatchSnapshot();
        //expect(getByTestId())
    })

