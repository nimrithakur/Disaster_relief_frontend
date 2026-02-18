const fs = require('fs');

const icon192 = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAYAAABS3GwHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDIvMDcvMjYBVN6AAAAACklEQVR4nO3BAQ0AAADCoPdPbQ8HFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvgzcVgAB68Sf1gAAAABJRU5ErkJggg==',
  'base64'
);

fs.writeFileSync(__dirname + '/../public/icon-192.png', icon192);
fs.writeFileSync(__dirname + '/../public/icon-512.png', icon192);

console.log('✅ Icon files created');
