require 'rails_helper'

RSpec.describe StatusController, type: :controller do
  it "renders an OK status", type: :request do
    get "/"
    expect(json_body["status"]).to eq("ok")
  end
end

