# frozen_string_literal: true

ActiveModelSerializers.config.tap do |config|
  config.key_transform = :camel_lower
end
