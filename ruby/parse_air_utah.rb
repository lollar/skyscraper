class ParseAirUtah
  require 'nokogiri'
  require_relative 'air_utah'

  def initialize(county)
    @county = county
    @data = Nokogiri::HTML(AirUtah.new.scrape_site(@county))
  end

  def values
    val = [ Time.now.strftime('%B %d, %Y %I:%M:%S %P') ]
    html_tags.each { |_, tag_value| val << default_parser(tag_value[0], tag_value[1]) }
    val << parse_aqi
    val << @county
  end

  private

  def default_parser(html_attr, regex)
    value = @data.css(html_attr).children.map{ |child| child.text.strip if child.text.strip.match(regex) }
    value.compact!
    puts "\n\n #{value} \n\n"
    value.size > 1 ? parsed_data_error : value.first
  end

  def parse_aqi
    aqi = @data.css('div.pollutantStat').children.search('img').map do |x|
      x['src']
    end

    aqi.compact!
    aqi.size > 1 ? parsed_data_error : aqi.first[aqi.first.index('.') - 3...aqi.first.index('.')]
  end

  def wind_directions
    ['N', 'E', 'S', 'W', 'NE', 'NW', 'SE', 'SW']
  end

  def html_tags
    {
      pollution: ['div.pm25', /^[0-9]+\.[0-9]+/x],
      ozone: ['div.ozone', /^[0-9]+\.[0-9]+/x],
      temperature: ['div.temperature', /^[0-9]+.+F/],
      wind: ['div.wind', /^#{wind_directions}+ [0-9]+\.?[0-9]*/]
    }
  end

  def parsed_data_error
    raise CustomErrors::ParsedDataError
  end
end
