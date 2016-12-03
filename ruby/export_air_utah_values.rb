class ExportAirUtahValues
  require_relative 'parse_air_utah'

  FILE_NAME = './csv/air_utah_values.csv'

  def perform(county = 'salt lake')
    @county = county
    @values = ParseAirUtah.new(@county).values
    export_data_to_csv
  end

  def self.perform(county = 'salt lake')
    self.new.perform(county)
  end

  def self.perform_for_all_counties
    self.all_counties.each{ |c| self.new.perform(c) }
  end

  private

  def export_data_to_csv
    CSV.open(FILE_NAME, "a") do |r|
      r << column_headers unless File.exist?(FILE_NAME)
      r << @values
    end
  end

  def file_name
    "air_utah_values_#{@county.gsub(' ', '_')}.csv"
  end

  def column_headers
    ['timestamp','particulates','ozone','temperature','wind', 'aqi', 'county']
  end

  def self.all_counties
    ['box elder', 'cache', 'carbon', 'davis', 'duchesne', 'salt lake', 'tooele', 'uintah', 'utah', 'washington', 'weber']
  end
end
