import sys
name = sys.argv[1]
link = sys.argv[2]

op=''
op+='<!DOCTYPE html>\n'
op+='<html>\n'
op+='<head>\n'
op+='<meta http-equiv="Refresh" content="3;'+link+'">\n'
op+='</head>\n'

op+='<body>\n'
op+='<p>'+name+' is an artist: <a href="'+link+'">'+link+'</a></p>\n'
op+='<p>You will be redirected to the address in three seconds.</p>\n'
op+='<p>If you see this message for more than 3 seconds, please click on the link above!</p>\n'
op+='</body>\n'

op+='</html>\n'


output=open(name+'.html',"w")
output.write(op)
output.close()
