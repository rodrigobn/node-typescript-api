import axios from 'axios';
import { StormGlass } from '@src/clients/stormGlass';
import stormGlassWeather3hoursFixture from '@test/fixtures/stormglass_weather_3_hours.json';
import stormGlassNormalized3hoursFixture from '@test/fixtures/stormGlass_normalized_response_3_hours.json';
jest.mock('axios');

describe('StormGlass client', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
    it('should return the normalized forecast from from the Stormglass service', async () => {
    const lat = -33.792726;
    const lng = 151.289824;

    mockedAxios.get.mockResolvedValue({ data: stormGlassWeather3hoursFixture });

    const stormGlass = new StormGlass(mockedAxios);
    const reponse = await stormGlass.fetchPoints(lat, lng);
    expect(reponse).toEqual(stormGlassNormalized3hoursFixture);
  });
});
