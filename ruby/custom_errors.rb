module CustomErrors
  
  class InvalidCountyError < RuntimeError
    def initialize(msg = 'INVALID COUNTY INPUT!')
      super
    end
  end
  
  class ParsedDataError < RuntimeError
    def initialize(msg = 'Too many values captured while parsing, aborting...')
      super
    end
  end
  
end  
