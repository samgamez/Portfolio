using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WeatherApiInterface.Data
{
	public class WeatherForecastDto
	{
		public double Temp { get; set; }
		public double Pressure { get; set; }
		public double Humidity { get; set; }
		public string IconCode { get; set; }
		public string IconDescription { get; set; }
		public double WindSpeed { get; set; }
		public string ImgUrl { get; set; }
		public string City { get; set; }
	}
}
