require 'rails_helper'

RSpec.describe "status", :type => :request do
  # it "displays the user's username after successful login" do
  #   user = User.create!(:username => "jdoe", :password => "secret")
  #   get "/login"
  #   assert_select "form.login" do
  #     assert_select "input[name=?]", "username"
  #     assert_select "input[name=?]", "password"
  #     assert_select "input[type=?]", "submit"
  #   end

  #   post "/login", :username => "jdoe", :password => "secret"
  #   assert_select ".header .username", :text => "jdoe"
  # end
  it "renders an OK status", type: :request do
    user = create(:user)
  end
end
