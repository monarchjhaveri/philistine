require 'faker'

# This will guess the User class
FactoryBot.define do
  factory :user do
    username Faker::Name.name
    password  "password"
  end
end