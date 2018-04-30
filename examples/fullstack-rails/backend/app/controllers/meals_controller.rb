class MealsController < ApplicationController
  before_action :set_meal, only: [:show, :update, :destroy]
  before_action :set_user

  def index
     meals = Meal.includes(:user).where(user_id: @user.id)

     render json: meals, status: :created
  end

  def show
    render json: @meal
  end

  def create
    @meal = @user.meals.new(meal_params)

    if @meal.save
      render json: @meal, status: :created
    else
      render json: @meal.errors, status: :unprocessable_entity
    end
  end

  def update
    if @meal.update(meal_params)
      render json: @meal
    else
      render json: @meal.errors, status: :unprocessable_entity
    end
  end

  # DELETE /meals/1
  def destroy
    @meal.destroy
  end

  private
    def set_user
      user_id = params.require(:user_id)
      @user = User.find(user_id)

      # TODO: validate user
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_meal
      @meal = Meal.find_by!(id: params[:id], user_id: params[:user_id])
    end

    # Only allow a trusted parameter "white list" through.
    def meal_params
      params.require(:user_id)
      params.require(:meal).permit(:description, :calories, :user_id)
    end
end
