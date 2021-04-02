import axios from 'axios';
import { StormGlass } from '@src/clients/stormGlass';
import stormGlassWeather3hoursFixture from '@test/fixtures/stormglass_weather_3_hours.json';
import stormGlassNormalized3hoursFixture from '@test/fixtures/stormGlass_normalized_response_3_hours.json';
jest.mock('axios');

describe('StormGlass client', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
    it('deve retornar a previsão normalizada do serviço Stormglass', async () => {
    const lat = -33.792726;
    const lng = 151.289824;

    mockedAxios.get.mockResolvedValue({ data: stormGlassWeather3hoursFixture });

    const stormGlass = new StormGlass(mockedAxios);
    const reponse = await stormGlass.fetchPoints(lat, lng);
    expect(reponse).toEqual(stormGlassNormalized3hoursFixture);
  });

  //Teste para validar se todos os pontos existem
  it('deve excluir pontos de dados incompletos', async () => {
    const lat = -33.792726;
    const lng = 151.289824;
    const incompleteResponse = {
      hours: [
        {
          windDirection: {
            noaa: 300,
          },
          time: '2020-04-26T00:00:00+00:00',
        },
      ],
    };
    mockedAxios.get.mockResolvedValue({ data: incompleteResponse });

    const stormGlass = new StormGlass(mockedAxios);
    const response = await stormGlass.fetchPoints(lat, lng);

    expect(response).toEqual([])
  });


  it('deve obter um erro genérico do serviço StormGlass quando a solicitação falha antes de chegar ao serviço', async () => {
    const lat = -33.792726;
    const lng = 151.289824;
    
    mockedAxios.get.mockRejectedValue({ message: 'Network Error' });

    const stormGlass = new StormGlass(mockedAxios);

    await expect(stormGlass.fetchPoints(lat, lng)).rejects.toThrow(
      'Unexpected error when trying to communicate to StormGlass: Network Error'
    );
  });

  it('deve obter um StormGlassResponseError quando o serviço StormGlass responder com erro', async () => {
    const lat = -33.792726;
    const lng = 151.289824;

    mockedAxios.get.mockRejectedValue({
      response: {
        status: 429,
        data: { errors: ['Rate Limit reached' ] },
      },
    });

    const stormGlass = new StormGlass(mockedAxios);

    await expect(stormGlass.fetchPoints(lat, lng)).rejects.toThrow(
      `Unexpected error returned by the StormGlass service: Error: {"errors":["Rate Limit reached"]} Code: 429`
    )
  })
});
