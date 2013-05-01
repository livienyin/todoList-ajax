class TodoItemsController < ApplicationController

  def todo_list
  end

  def get_items
    @todo_items = TodoItem.all
    respond_to do |format|
      format.html { render json: @todo_items }
      format.json { render json: @todo_items }
    end
  end
  
  def create
    @todo_item = TodoItem.new(params[:todo_item])

    respond_to do |format|
      if @todo_item.save
        format.html { redirect_to @todo_item, notice: 'Todo item was successfully created.' }
        format.json { render json: @todo_item, status: :created, location: @todo_item }
      else
        format.html { render action: "new" }
        format.json { render json: @todo_item.errors, status: :unprocessable_entity }
      end
    end
  end

  def complete
    @todo_item = TodoItem.find(params[:id])
    @todo_item.completed = !@todo_item.completed
    @todo_item.save
    respond_to do |format|
      format.html { render json: @todo_item }
      format.json { render json: @todo_item }
    end    
  end
  
  def destroy
    
  end
end
