require 'rails_helper'

RSpec.describe UsersController, type: :request do
  describe "/users/register" do
    before(:each) do
      post "/users/register", params: {
        username: 'username',
        password: 'password'
      }
    end

    it "can register a user" do
      expect(response.body).to be_empty
      expect(response.status).to be 204
    end

    it "has registered a user" do
      user = User.find_by(username: 'username')
      expect(user).to be
    end

    it "disallows re-registration of the same username" do
      expect {
        post "/users/register", params: {
          username: 'username',
          password: 'password'
        }
      }.to raise_error ActiveRecord::RecordNotUnique
    end
  end

  describe "login, logout" do
    before(:each) do
      User.create!(
        username: 'username',
        password: 'password'
      )
    end
    
    describe "sunny day" do
      before(:each) do
        post "/users/login", params: {
          username: 'username',
          password: 'password'
        }
      end

      it "allows users to log in" do
        expect(response.status).to be 200
        expect(json_body["token"]).to be
      end
    end

    describe "bad cases" do
      it "disallows incorrect passwords" do
        post "/users/login", params: {
          username: 'username',
          password: 'wrong-password'
        }

        expect(json_body["message"]).to eq "Login failed"
        expect(response.status).to be 401
      end
    end
  end
end
