class MealSerializer < ActiveModel::Serializer
  attributes :id, :description, :calories, :created_at

  has_one :user
end
