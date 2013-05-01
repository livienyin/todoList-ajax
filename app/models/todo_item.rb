class TodoItem < ActiveRecord::Base
  attr_accessible :completed, :due_at, :name
end
