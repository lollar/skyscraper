class AirUtah
  require 'HTTParty'
  require_relative 'custom_errors'

  URL = 'http://air.utah.gov'

  def scrape_site(county)
    url_id = county_code_hash[county.gsub(' ', '_').to_sym]
    raise CustomErrors::InvalidCountyError if url_id.nil?

    HTTParty.get(URL, query: { id: url_id })
  end

  private

  def county_code_hash
    {
      box_elder:  'br',
      cache:      'sm',
      carbon:     'p2',
      davis:      'ds',
      duchesne:   'rs',
      salt_lake:  'slc',
      tooele:     'ed',
      uintah:     'v4',
      utah:       'np',
      washington: 'hc',
      weber:      'o2',
    }
  end

end
