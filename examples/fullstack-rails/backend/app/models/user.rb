class User < ApplicationRecord
  has_secure_password

  has_many :meals

  def session_token
    return nil if self.token_uuid.blank? || self.session_expired?

    User.jwt_encode self.token_uuid
  end

  def authenticate_token(token)
    return false if self.token_uuid.blank?

    uuid = jwt_decode token
    self.token_uuid === uuid
  end

  def logout
    self.token_uuid = nil
    self.token_expiry = nil
    self.save if self.changed?
  end

  def self.login(username=nil, password=nil)
    user = User
      .find_by(username: username)
      .try(:authenticate, password)

    # user not found, return nil
    return nil if user.blank?

    # reset/create session
    if user.session_expired?
      user.token_uuid = SecureRandom.uuid
      user.token_expiry = Time.now + 10.days
      user.save!
    end

    #return user
    user
  end

  def self.find_by_token(token)
    uuid = jwt_decode token
    self.find_by(token_uuid: uuid)
  end

  def session_expired?
    self.token_expiry.blank? || (self.token_expiry < Time.now)
  end

  private

  def self.jwt_encode(uuid)
    json = JSON.generate({uuid: uuid})
    JWT.encode json, jwt_password, jwt_algorithm
  end

  def self.jwt_decode(token)
    decoded = JWT.decode token, jwt_password, jwt_algorithm
    json = decoded[0]
    JSON.parse(json)["uuid"]
  end

  def self.jwt_password
    Rails.application.secrets.secret_key_base
  end

  def self.jwt_algorithm
    'HS256'
  end
end
