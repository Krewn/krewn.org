


#Begin imports ###############################################################################################

import os
import numpy as np
import re
import sys
import csv

###end imports ###############################################################################################
####Begin defs ###############################################################################################

def hotRefScan(n):
	fileIN=n
	Data={}
	with open(fileIN) as csvfile:
		tableMain=csv.reader(csvfile,delimiter='p')
		k=0
		for row in tableMain:
			Data[k]=row
			k+=1							#Read the Data into dict Data
	return(Data)

def gfl(n,phrase):#getfirst line containing phrase
	fileIN=n
	Data={}
	with open(fileIN) as csvfile:
		tableMain=csv.reader(csvfile)
		k=0
		for row in tableMain:
			Data[k]=row
			k+=1							#Read the Data into dict Data
	return(Data)

def has(a,b):
	ret=False
	for k in a:
		print str(k)+b+str(b==k)
		if(b==k):
			ret=True
			return(True)
	return(ret)

def NfromL(k2):
	end=len(k2)
	c = len(k2)
	while(k2[c]!='/'):
		if(k2[c]=='.'):
			end = c
		c-=1
	alt=k2[c:end]
	return(alt)

def NfromLwE(k2):
	print k2
	c = len(k2)
	while((k2[c]!='/') and (c > 0)):
		c-=1
		print c
	alt=k2[c:]
	return(alt)

def reD(a,p):
	ret=''
	first=True
	for k in a:
		if first:
			ret+=k
			first=False
		else:
			ret+=k+p
	return(ret[:-1])


#######end defs ###############################################################################################

#Begin
# # # #Begin Output production # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
print 'Imports Complete, producing krewn.org'
op='<html><div><h1>Welcome to Krewn.org please enjoy the content.</h1></div><body>\n'
op+='<h3><a href="https://github.com/Krewn/krewn.org">So what what wrote what I am looking at?</a></h3>\n'
WWWfiles = [f for f in os.listdir('.') if (os.path.isfile(f))]
#print WWWfiles 
print'\n'
WWWfolders = [x[0] for x in os.walk('.') if(('.' in x[0][1:])==False)]
#print WWWFolders
print'\n'
		
#if(os.path.exists('Art')):
print 'has art'
os.chdir('Art')
Artfolders = [x[0] for x in os.walk('.') if(('.' in x[0][1:])==False)]
print Artfolders
print'\n'
q=0
for k in Artfolders:
	op+='<div>'
	q+=1
	#print [x[0] for x in os.walk('.') if(('.' in x[0][1:])==False)]
	print os.getcwd()
	print k
	print '#'*q+'\n'
	
	if(os.path.exists(k) and (k != '.')):
		#print op
		os.chdir(k)
		hotRef = [f for f in os.listdir('.') if (os.path.isfile(f) and '.html' in f[-5:])]
		print hotRef
		if(type(hotRef)==list):
			if(len(hotRef)>=1):	
				hotRef=hotRef[0]
			else:
				hotRef = None
		if(hotRef!=None):
			op+='<a href="./Art/'+k+'/'+hotRef+'">'+hotRef+'</a>\n'
			op+='</div>\n'
			op+='<div>\n'
			images =[f for f in os.listdir('.') if (os.path.isfile(f) and (('.html' in f)==False) and (('.js' in f)==False) and (('.py' in f)==False))]
			print 'images>>'
			print images
			for k2 in images:
				op+='<img src="./Art/'+k+'/'+k2+'"alt="'+k2+'">\n'
			os.chdir('..')
	else:
		print k
		#print os.getcwd()
		#os.listdir(os.getcwd())
	
	op+='</div>\n'
#else:
#	perhaps = [x[0] for x in os.walk('.') if((('Art' in x[0])==True) or (('Stock' in x[0])==True))]
#	op+='<!-- Art folder was not found in cwd -- posible canidate folders:'+str(perhaps)+'-->'
os.chdir('..')


op+='</body></html>\n'

print'\n>>\n'

print op

print'\n<<\n'
os.system('rm index.html')
os.system('touch index.html')

temp = open('index.html',"w")
temp.write(op)
temp.close()












# # # #     end Output production # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
print 'setup complete, introducting krewn.org'
