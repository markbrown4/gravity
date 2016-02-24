function Vector(x, y) {
  this.x = x || 0
  this.y = y || 0
}

Vector.prototype.add = function(vector) {
  this.x += vector.x;
  this.y += vector.y;
}

Vector.prototype.getMagnitude = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y)
}

Vector.prototype.getAngle = function() {
  return Math.atan2(this.y,this.x)
};

Vector.fromAngle = function (angle, magnitude) {
  return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle))
}

function Particle(point, velocity, acceleration) {
  this.position = point || new Vector(0, 0)
  this.velocity = velocity || new Vector(0, 0)
  this.acceleration = acceleration || new Vector(0, 0)
}

Particle.prototype.move = function () {
  this.velocity.add(this.acceleration)
  this.position.add(this.velocity)
}

Particle.prototype.submitToFields = function (fields) {
  var totalAccelerationX = 0
  var totalAccelerationY = 0

  fields.forEach(function(field) {
    var vectorX = field.position.x - this.position.x
    var vectorY = field.position.y - this.position.y
    var force = field.mass / Math.pow(vectorX*vectorX + vectorY*vectorY,1.5)

    totalAccelerationX += vectorX * force
    totalAccelerationY += vectorY * force
  }.bind(this))

  this.acceleration = new Vector(totalAccelerationX, totalAccelerationY)
}

function Field(point, mass) {
  this.position = point
  this.mass = mass || 100
}
