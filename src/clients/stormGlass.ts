import { AxiosStatic } from "axios";

export class StormGlass {
    //readonly significa q não pode ser alterado
    readonly stormGlassAPIParams = 'swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,windDirection,windSpeed'
    readonly stormGlassAPISource = 'noaa'
    
    constructor(protected request: AxiosStatic) {

    }

    public async fetchPoints(lat: number, lng: number): Promise<{}> {
        return this.request.get(`https://api.stormglass.io/v2/weather/point?params=${this.stormGlassAPIParams}&source=${this.stormGlassAPISource}&lat=${lat}&lng=${lng}.8081`)
    }
}