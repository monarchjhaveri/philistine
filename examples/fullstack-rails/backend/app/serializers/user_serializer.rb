class UserSerializer < ActiveModel::Serializer
  attributes :username, :token_expiry, :id

  has_many :meals
end
