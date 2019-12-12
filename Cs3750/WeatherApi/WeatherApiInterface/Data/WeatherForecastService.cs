using Newtonsoft.Json;
using System;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace WeatherApiInterface.Data
{
	public class WeatherForecastService
	{
		// The HttpClientFactory is what makes it possible for us to call the Weather API.
		private readonly IHttpClientFactory _clientFactory;

		public WeatherForecastService(IHttpClientFactory clientFactory)
		{
			// Initialize the client factory here in the constructor.
			_clientFactory = clientFactory;
		}

		/// <summary>
		/// Calls on the openweather API to get the current weather forecast for a city.
		/// </summary>
		/// <param name="city">The city to get the forecast for.</param>
		/// <returns>The result as a DTO to be used by the client.</returns>
		public async Task<WeatherForecastDto> GetForecastResult(string city)
		{
			// Get the client object.
			var client = _clientFactory.CreateClient();

			// Create the URI string.
			var uri = $"http://api.openweathermap.org/data/2.5/weather?q={city}&APPID=2038ec5184263f924f491fb3143efda8&units=imperial";

			// Asynchronously call the API function.
			var response = await client.GetStringAsync(uri);

			//  Dynamic is a type in C# that can store any thing on it. Kind of like a JavaScript object.
			dynamic jsonObject = JsonConvert.DeserializeObject(response); // To use this JsonConvert function, I installed the Newtonsoft.json nuget package.

			// Map the result according to the Json object that gets returned from the API.
			WeatherForecastDto result = new WeatherForecastDto
			{
				City = jsonObject.name,
				Temp = jsonObject.main.temp,
				Pressure = jsonObject.main.pressure,
				Humidity = jsonObject.main.humidity,
				IconCode = jsonObject.weather[0].icon,
				IconDescription = jsonObject.weather[0].description,
				WindSpeed = jsonObject.wind.speed,
				ImgUrl = $"http://openweathermap.org/img/wn/{jsonObject.weather[0].icon}.png"
			};

			return result;
		}
	}
}
