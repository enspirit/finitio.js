StringUtils = {

  capitalize: (str) ->
    str[0].toUpperCase() + str.slice(1)

}

module.exports = {
  string: StringUtils
}