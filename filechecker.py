import multiprocessing
from multiprocessing import Pool
import hashlib
from os import listdir
from os.path import isfile, join
import datetime
import argparse
import sys
import urllib2
import os


import threading

def set_interval(func, sec):
    def func_wrapper():
        set_interval(func, sec)
        func()
    t = threading.Timer(sec, func_wrapper)
    t.start()
    return t


def worker(book, hashToTest):
    """worker function"""
    with open('./books/' + book) as f:
        content = f.read().splitlines()
        for line in content:
            for c, i in enumerate(line): 
                
                m = hashlib.md5()
                m.update(line[c:c+19])
                # print line[c:c+18]
                # print m.hexdigest()

                if m.hexdigest() == hashToTest:
                    duration = 1  # second
                    freq = 440  # Hz
                    os.system('play --no-show-progress --null --channels 1 synth %s sine %f' % (duration, freq))
                    print 'success at'
                    print(datetime.datetime.now())
                    print line[c:c+19]
                    contents = urllib2.urlopen("192.168.86.177:3000/success").read()
                    return true



if __name__ == '__main__':
    pool = Pool(processes = 4)
    jobs = []
    activeJobs = []
    onlyfiles = [f for f in listdir('./books') if isfile(join('./books', f))]
    for i in onlyfiles:
        # print str(sys.argv[1]), i
        pool.apply_async(worker, args=(i,str(sys.argv[1]).lower()))
        # p = multiprocessing.Process(target=worker,  )
        # jobs.append(p)
        # p.start()
    pool.close()
    pool.join()
    

    set_interval
